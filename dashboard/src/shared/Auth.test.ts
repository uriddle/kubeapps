// Copyright 2019-2023 the Kubeapps contributors.
// SPDX-License-Identifier: Apache-2.0

import { Code } from "@bufbuild/connect";
import { AxiosResponse } from "axios";
import { CheckNamespaceExistsResponse } from "gen/kubeappsapis/plugins/resources/v1alpha1/resources_pb";
import jwt from "jsonwebtoken";
import { Auth } from "./Auth";
import { SupportedThemes } from "./Config";
import { KubeappsGrpcClient } from "./KubeappsGrpcClient";
import { initialState } from "./specs/mountWrapper";

describe("Auth", () => {
  // Create a real client, but we'll stub out the function we're interested in.
  const client = new KubeappsGrpcClient().getResourcesServiceClientImpl();
  let mockClientCheckNamespaceExists: jest.MockedFunction<typeof client.checkNamespaceExists>;

  beforeEach(() => {
    mockClientCheckNamespaceExists = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(new CheckNamespaceExistsResponse({ exists: true })),
      );
    jest.spyOn(client, "checkNamespaceExists").mockImplementation(mockClientCheckNamespaceExists);
    jest.spyOn(Auth, "resourcesServiceClient").mockImplementation(() => client);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return without error when the endpoint succeeds with the given token", async () => {
    await Auth.validateToken("othercluster", "foo");

    expect(Auth.resourcesServiceClient).toHaveBeenCalledWith("foo");
    expect(mockClientCheckNamespaceExists).toHaveBeenCalledWith({
      context: {
        cluster: "othercluster",
        namespace: "default",
      },
    });
  });

  it("should return without error when the endpoint returns PermissionDenied with the given token", async () => {
    mockClientCheckNamespaceExists = jest
      .fn()
      .mockImplementation(() => Promise.reject({ code: Code.PermissionDenied }));
    jest.spyOn(client, "checkNamespaceExists").mockImplementation(mockClientCheckNamespaceExists);
    await Auth.validateToken("othercluster", "foo");

    expect(Auth.resourcesServiceClient).toHaveBeenCalledWith("foo");
    expect(mockClientCheckNamespaceExists).toHaveBeenCalledWith({
      context: {
        cluster: "othercluster",
        namespace: "default",
      },
    });
  });

  describe("when there is an error", () => {
    [
      {
        name: "should throw an invalid token error for 401 responses",
        response: { status: 401, data: "ignored anyway" },
        grpcCode: Code.Unauthenticated,
        expectedError: new Error("invalid token"),
      },
      {
        name: "should throw a standard error for a 404 response",
        grpcCode: Code.NotFound,
        expectedError: new Error("not found"),
      },
      {
        name: "should throw a standard error for a 500 response",
        grpcCode: Code.Internal,
        expectedError: new Error("internal error"),
      },
    ].forEach(testCase => {
      it(testCase.name, async () => {
        mockClientCheckNamespaceExists = jest
          .fn()
          .mockImplementation(() => Promise.reject({ code: testCase.grpcCode }));
        jest
          .spyOn(client, "checkNamespaceExists")
          .mockImplementation(mockClientCheckNamespaceExists);

        await expect(Auth.validateToken("default", "foo")).rejects.toThrow(testCase.expectedError);
      });
    });
  });

  describe("isAuthenticatedWithCookie", () => {
    it("returns true if request to API root succeeds", async () => {
      const isAuthed = await Auth.isAuthenticatedWithCookie("somecluster");

      expect(Auth.resourcesServiceClient).toHaveBeenCalledWith();
      expect(mockClientCheckNamespaceExists).toHaveBeenCalledWith({
        context: {
          cluster: "somecluster",
          namespace: "default",
        },
      });
      expect(isAuthed).toBe(true);
    });

    it("returns false if the request results in a non-grpc-web response", async () => {
      mockClientCheckNamespaceExists = jest.fn().mockImplementation(() =>
        Promise.reject({
          code: Code.PermissionDenied,
          metadata: new Headers({
            "content-type": "not-grpc-content-type",
          }),
        }),
      );
      jest.spyOn(client, "checkNamespaceExists").mockImplementation(mockClientCheckNamespaceExists);

      const isAuthed = await Auth.isAuthenticatedWithCookie("somecluster");

      expect(isAuthed).toBe(false);
    });

    it("returns true if the request to api root results in a 403", async () => {
      mockClientCheckNamespaceExists = jest.fn().mockImplementation(() =>
        Promise.reject({
          code: Code.PermissionDenied,
          metadata: new Headers({
            "content-type": "application/grpc-web+proto",
          }),
        }),
      );
      jest.spyOn(client, "checkNamespaceExists").mockImplementation(mockClientCheckNamespaceExists);

      const isAuthed = await Auth.isAuthenticatedWithCookie("somecluster");

      expect(isAuthed).toBe(true);
    });

    it("returns true if the request to api root results in a 403 with another grpc protocol", async () => {
      mockClientCheckNamespaceExists = jest.fn().mockImplementation(() =>
        Promise.reject({
          code: Code.PermissionDenied,
          metadata: new Headers({
            "content-type": "application/grpc-web+thrift",
          }),
        }),
      );
      jest.spyOn(client, "checkNamespaceExists").mockImplementation(mockClientCheckNamespaceExists);

      const isAuthed = await Auth.isAuthenticatedWithCookie("somecluster");

      expect(isAuthed).toBe(true);
    });
    it("returns false if the request results in a 401", async () => {
      mockClientCheckNamespaceExists = jest.fn().mockImplementation(() =>
        Promise.reject({
          code: Code.Unauthenticated,
          metadata: new Headers({
            "content-type": "not-grpc-content-type",
          }),
        }),
      );
      jest.spyOn(client, "checkNamespaceExists").mockImplementation(mockClientCheckNamespaceExists);

      const isAuthed = await Auth.isAuthenticatedWithCookie("somecluster");

      expect(isAuthed).toBe(false);
    });
  });

  describe("defaultNamespaceFromToken", () => {
    const customNamespace = "kubeapps-user";

    it("should return the k8s namespace from the jwt token", () => {
      const token = jwt.sign(
        {
          iss: "kubernetes/serviceaccount",
          "kubernetes.io/serviceaccount/namespace": customNamespace,
        },
        "secret",
      );

      const defaultNamespace = Auth.defaultNamespaceFromToken(token);

      expect(defaultNamespace).toEqual(customNamespace);
    });

    it("should return an empty string if the namespace is not present", () => {
      const token = jwt.sign(
        {
          iss: "kubernetes/serviceaccount",
        },
        "secret",
      );

      const defaultNamespace = Auth.defaultNamespaceFromToken(token);

      expect(defaultNamespace).toEqual("");
    });

    it("should return an empty string if the token cannot be decoded", () => {
      const token = "not a jwt token";

      const defaultNamespace = Auth.defaultNamespaceFromToken(token);

      expect(defaultNamespace).toEqual("");
    });
  });

  describe("unsetAuthCookie", () => {
    let mockedAssign: jest.Mocked<(url: string) => void>;
    beforeEach(() => {
      mockedAssign = jest.fn();
      // After the JSDOM upgrade, window.xxx are read-only properties
      // https://github.com/facebook/jest/issues/9471
      Object.defineProperty(window, "location", {
        configurable: true,
        writable: true,
        value: { assign: mockedAssign },
      });
    });

    it("uses the config to redirect to a logout URL", () => {
      const oauthLogoutURI = "/example/logout";

      Auth.unsetAuthCookie({
        oauthLoginURI: "",
        authProxyEnabled: true,
        oauthLogoutURI,
        kubeappsCluster: "default",
        kubeappsNamespace: "ns",
        helmGlobalNamespace: "ns-global",
        carvelGlobalNamespace: "kapp-controller-packaging-global",
        appVersion: "2",
        clusters: [],
        featureFlags: { ...initialState.config.featureFlags },
        authProxySkipLoginPage: false,
        theme: SupportedThemes.light,
        remoteComponentsUrl: "",
        customAppViews: [],
        skipAvailablePackageDetails: false,
        createNamespaceLabels: {},
        configuredPlugins: [],
      });

      expect(mockedAssign).toBeCalledWith(oauthLogoutURI);
      expect(localStorage.removeItem).toBeCalled();
    });

    it("defaults to the oauth2-proxy logout URI", () => {
      Auth.unsetAuthCookie({
        oauthLoginURI: "",
        authProxyEnabled: true,
        oauthLogoutURI: "",
        kubeappsCluster: "default",
        kubeappsNamespace: "ns",
        helmGlobalNamespace: "ns-global",
        carvelGlobalNamespace: "kapp-controller-packaging-global",
        appVersion: "2",
        clusters: [],
        featureFlags: { ...initialState.config.featureFlags },
        authProxySkipLoginPage: false,
        theme: SupportedThemes.light,
        remoteComponentsUrl: "",
        customAppViews: [],
        skipAvailablePackageDetails: false,
        createNamespaceLabels: {},
        configuredPlugins: [],
      });

      expect(mockedAssign).toBeCalledWith("/oauth2/sign_out");
    });
  });
});

describe("is403FromAuthProxy", () => {
  it("does not assume to be authenticated from the auth proxy if the message contains a service account", () => {
    expect(
      Auth.is403FromAuthProxy({
        status: 403,
        data: 'namespaces is forbidden: User "system:serviceaccount:kubeapps:kubeapps-internal-kubeappsapis" cannot list resource "namespaces" in API group "" at the cluster scope',
      } as AxiosResponse<any>),
    ).toBe(false);
  });
});

describe("isAnonymous", () => {
  it("returns true if the message includes 'system:anonymous' in response.data", () => {
    expect(
      Auth.isAnonymous({
        status: 403,
        data: '{"metadata":{},"status":"Failure","message":"selfsubjectaccessreviews.authorization.k8s.io is forbidden: User "system:anonymous" cannot create resource "selfsubjectaccessreviews" in API group "authorization.k8s.io" at the cluster scope","reason":"Forbidden","details":{"group":"authorization.k8s.io","kind":"selfsubjectaccessreviews"},"code":403} {"namespaces":null}',
      } as AxiosResponse<any>),
    ).toBe(true);
  });
  it("returns true if the message includes 'system:anonymous' in response.data.message", () => {
    expect(
      Auth.isAnonymous({
        status: 403,
        data: {
          message:
            '{"metadata":{},"status":"Failure","message":"selfsubjectaccessreviews.authorization.k8s.io is forbidden: User "system:anonymous" cannot create resource "selfsubjectaccessreviews" in API group "authorization.k8s.io" at the cluster scope","reason":"Forbidden","details":{"group":"authorization.k8s.io","kind":"selfsubjectaccessreviews"},"code":403} {"namespaces":null}',
        },
      } as AxiosResponse<any>),
    ).toBe(true);
  });
  it("returns false if the message does not include 'system:anonymous' in response.data", () => {
    expect(
      Auth.isAnonymous({
        status: 403,
        data: 'namespaces is forbidden: User "system:serviceaccount:kubeapps:kubeapps-internal-kubeappsapis" cannot list resource "namespaces" in API group "" at the cluster scope',
      } as AxiosResponse<any>),
    ).toBe(false);
  });
  it("returns false if the message does not include 'system:anonymous' in response.data.message", () => {
    expect(
      Auth.isAnonymous({
        status: 403,
        data: {
          message:
            'namespaces is forbidden: User "system:serviceaccount:kubeapps:kubeapps-internal-kubeappsapis" cannot list resource "namespaces" in API group "" at the cluster scope',
        },
      } as AxiosResponse<any>),
    ).toBe(false);
  });
});
