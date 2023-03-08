// Copyright 2021-2022 the Kubeapps contributors.
// SPDX-License-Identifier: Apache-2.0

// @generated by protoc-gen-es v1.0.0 with parameter "target=ts,import_extension=none"
// @generated from file kubeappsapis/plugins/fluxv2/packages/v1alpha1/fluxv2.proto (package kubeappsapis.plugins.fluxv2.packages.v1alpha1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type {
  BinaryReadOptions,
  FieldList,
  JsonReadOptions,
  JsonValue,
  PartialMessage,
  PlainMessage,
} from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * Flux PackageRepositoryCustomDetail
 *
 * Custom details for a Flux Package repository
 *
 * @generated from message kubeappsapis.plugins.fluxv2.packages.v1alpha1.FluxPackageRepositoryCustomDetail
 */
export class FluxPackageRepositoryCustomDetail extends Message<FluxPackageRepositoryCustomDetail> {
  /**
   * optional field that allows specifying an OIDC provider used for authentication purposes
   * Supported options are:
   *  - generic
   *  - aws
   *  - azure
   *  - gcp
   * The provider field is supported only for Helm OCI repositories. The repository type must
   * be set to "oci"
   * ref https://fluxcd.io/flux/components/source/helmrepositories/#provider
   *
   * @generated from field: string provider = 1;
   */
  provider = "";

  constructor(data?: PartialMessage<FluxPackageRepositoryCustomDetail>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName =
    "kubeappsapis.plugins.fluxv2.packages.v1alpha1.FluxPackageRepositoryCustomDetail";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "provider", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): FluxPackageRepositoryCustomDetail {
    return new FluxPackageRepositoryCustomDetail().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): FluxPackageRepositoryCustomDetail {
    return new FluxPackageRepositoryCustomDetail().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): FluxPackageRepositoryCustomDetail {
    return new FluxPackageRepositoryCustomDetail().fromJsonString(jsonString, options);
  }

  static equals(
    a:
      | FluxPackageRepositoryCustomDetail
      | PlainMessage<FluxPackageRepositoryCustomDetail>
      | undefined,
    b:
      | FluxPackageRepositoryCustomDetail
      | PlainMessage<FluxPackageRepositoryCustomDetail>
      | undefined,
  ): boolean {
    return proto3.util.equals(FluxPackageRepositoryCustomDetail, a, b);
  }
}
