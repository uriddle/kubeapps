// Copyright 2020-2023 the Kubeapps contributors.
// SPDX-License-Identifier: Apache-2.0

import actions from "actions";
import Alert from "components/js/Alert";
import * as ReactRedux from "react-redux";
import {
  getStore,
  initialState,
  mountWrapper,
  renderWithProviders,
} from "shared/specs/mountWrapper";
import "@testing-library/jest-dom/extend-expect";
import { IStoreState } from "shared/types";
import OperatorNew from "./OperatorNew";
import { IOperatorsState } from "reducers/operators";
import { IClusterState } from "reducers/cluster";
import { Route, Routes } from "react-router-dom";
import { screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

const defaultOperator = {
  metadata: {
    name: "foo",
    namespace: "kubeapps",
  },
  status: {
    provider: {
      name: "Kubeapps",
    },
    defaultChannel: "beta",
    channels: [
      {
        name: "beta",
        currentCSV: "foo.1.0.0",
        currentCSVDesc: {
          displayName: "Foo",
          version: "1.0.0",
          description: "this is a testing operator",
          annotations: {
            capabilities: "Basic Install",
            repository: "github.com/vmware-tanzu/kubeapps",
            containerImage: "kubeapps/kubeapps",
            createdAt: "one day",
          },
          installModes: [],
        },
      },
    ],
  },
} as any;

let spyOnUseDispatch: jest.SpyInstance;
const kubeActions = { ...actions.operators };
beforeEach(() => {
  actions.operators = {
    ...actions.operators,
    getOperator: jest.fn(),
  };
  const mockDispatch = jest.fn(res => res);
  spyOnUseDispatch = jest.spyOn(ReactRedux, "useDispatch").mockReturnValue(mockDispatch);
});

afterEach(() => {
  actions.operators = { ...kubeActions };
  spyOnUseDispatch.mockRestore();
});

it("calls getOperator when mounting the component", () => {
  const getOperator = jest.fn();
  actions.operators.getOperator = getOperator;

  renderWithProviders(
    <Routes>
      <Route path="/c/:cluster/ns/:namespace/operators/new/:operator" element={<OperatorNew />} />
    </Routes>,
    {
      preloadedState: {
        clusters: {
          currentCluster: "default-cluster",
          clusters: {
            "default-cluster": {
              currentNamespace: "default",
            },
          },
        },
      },
      initialEntries: ["/c/default/ns/default/operators/new/foo"],
    },
  );

  expect(getOperator).toHaveBeenCalledWith(
    initialState.clusters.currentCluster,
    initialState.clusters.clusters[initialState.clusters.currentCluster].currentNamespace,
    "foo",
  );
});

it("parses the default channel when receiving the operator", () => {
  renderWithProviders(
    <Routes>
      <Route path="/c/:cluster/ns/:namespace/operators/new/:operator" element={<OperatorNew />} />
    </Routes>,
    {
      preloadedState: {
        operators: { operator: defaultOperator, ...initialState.operators },
      },
      initialEntries: ["/c/default-cluster/ns/operators/operators/new/foo"],
    },
  );
  expect(screen.getByLabelText("beta")).toHaveAttribute("checked");
});

it("renders a fetch error if present", () => {
  const wrapper = mountWrapper(
    getStore({
      operators: { errors: { operator: { fetch: new Error("Boom") } } },
    } as Partial<IStoreState>),
    <OperatorNew />,
  );
  expect(wrapper.find(Alert)).toIncludeText("Boom");
});

it("renders a create error if present", () => {
  const wrapper = mountWrapper(
    getStore({
      operators: { errors: { operator: { create: new Error("Boom") } } },
    } as Partial<IStoreState>),
    <OperatorNew />,
  );
  expect(wrapper.find(Alert)).toIncludeText("Boom");
});

it("shows an error if the operator doesn't have any channel defined", () => {
  const operator = {
    ...initialState.operators.operator,
    status: {
      ...initialState.operators.operator?.status,
      channels: [],
    },
  };
  renderWithProviders(
    <Routes>
      <Route path="/c/:cluster/ns/:namespace/operators/new/:operator" element={<OperatorNew />} />
    </Routes>,
    {
      preloadedState: {
        clusters: {
          currentCluster: "default-cluster",
          clusters: {
            "default-cluster": {
              currentNamespace: "default",
            },
          },
        },
        operators: {
          ...initialState.operators,
          operator,
        },
      },
      initialEntries: ["/c/default/ns/default/operators/new/foo"],
    },
  );

  expect(
    screen.getByText(
      "The Operator foo doesn't define a valid channel. This is needed to extract required info.",
    ),
  ).toBeInTheDocument();
});

it("disables the submit button if the operators ns is selected", () => {
  renderWithProviders(
    <Routes>
      <Route path="/c/:cluster/ns/:namespace/operators/new/:operator" element={<OperatorNew />} />
    </Routes>,
    {
      preloadedState: {
        operators: { operator: defaultOperator, ...initialState.operators },
        clusters: {
          currentCluster: "default-cluster",
          clusters: {
            "default-cluster": {
              currentNamespace: "operators",
            } as Partial<IClusterState>,
          },
        },
      },
      initialEntries: ["/c/default-cluster/ns/operators/operators/new/foo"],
    },
  );

  expect(screen.getByRole("alert")).toHaveTextContent(
    'It\'s not possible to install a namespaced operator in the "operators" namespace',
  );
  // Something with Clarity is stopping the button from having a disabled attribute.
  // expect(screen.getByText("Deploy")).toBeDisabled();
});

it("deploys an operator", async () => {
  const createOperator = jest.fn().mockReturnValue(true);
  actions.operators.createOperator = createOperator;
  const store = getStore({
    operators: { operator: defaultOperator } as Partial<IOperatorsState>,
    clusters: {
      currentCluster: "default-cluster",
      clusters: {
        "default-cluster": {
          currentNamespace: "kubeapps",
        } as Partial<IClusterState>,
      },
    },
  } as Partial<IStoreState>);

  const wrapper = mountWrapper(store, <OperatorNew />);
  await act(async () => {
    const onSubmit = wrapper.find("form").prop("onSubmit") as () => Promise<void>;
    await onSubmit();
  });

  expect(createOperator).toHaveBeenCalledWith(
    initialState.clusters.currentCluster,
    "kubeapps",
    "foo",
    "beta",
    "Automatic",
    "foo.1.0.0",
  );
});
