// Copyright 2021-2023 the Kubeapps contributors.
// SPDX-License-Identifier: Apache-2.0

// @generated by protoc-gen-es v1.2.1 with parameter "target=ts,import_extension=none"
// @generated from file kubeappsapis/plugins/helm/packages/v1alpha1/helm.proto (package kubeappsapis.plugins.helm.packages.v1alpha1, syntax proto3)
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
import { InstalledPackageReference } from "../../../../core/packages/v1alpha1/packages_pb";
import { DockerCredentials } from "../../../../core/packages/v1alpha1/repositories_pb";

/**
 * InstalledPackageDetailCustomDataHelm
 *
 * InstalledPackageDetailCustomDataHelm is a message type used for the
 * InstalledPackageDetail.CustomDetail field by the helm plugin.
 *
 * @generated from message kubeappsapis.plugins.helm.packages.v1alpha1.InstalledPackageDetailCustomDataHelm
 */
export class InstalledPackageDetailCustomDataHelm extends Message<InstalledPackageDetailCustomDataHelm> {
  /**
   * ReleaseRevision
   *
   * A number identifying the Helm revision
   *
   * @generated from field: int32 release_revision = 2;
   */
  releaseRevision = 0;

  constructor(data?: PartialMessage<InstalledPackageDetailCustomDataHelm>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName =
    "kubeappsapis.plugins.helm.packages.v1alpha1.InstalledPackageDetailCustomDataHelm";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 2, name: "release_revision", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): InstalledPackageDetailCustomDataHelm {
    return new InstalledPackageDetailCustomDataHelm().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): InstalledPackageDetailCustomDataHelm {
    return new InstalledPackageDetailCustomDataHelm().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): InstalledPackageDetailCustomDataHelm {
    return new InstalledPackageDetailCustomDataHelm().fromJsonString(jsonString, options);
  }

  static equals(
    a:
      | InstalledPackageDetailCustomDataHelm
      | PlainMessage<InstalledPackageDetailCustomDataHelm>
      | undefined,
    b:
      | InstalledPackageDetailCustomDataHelm
      | PlainMessage<InstalledPackageDetailCustomDataHelm>
      | undefined,
  ): boolean {
    return proto3.util.equals(InstalledPackageDetailCustomDataHelm, a, b);
  }
}

/**
 * @generated from message kubeappsapis.plugins.helm.packages.v1alpha1.RollbackInstalledPackageRequest
 */
export class RollbackInstalledPackageRequest extends Message<RollbackInstalledPackageRequest> {
  /**
   * Installed package reference
   *
   * A reference uniquely identifying the installed package.
   *
   * @generated from field: kubeappsapis.core.packages.v1alpha1.InstalledPackageReference installed_package_ref = 1;
   */
  installedPackageRef?: InstalledPackageReference;

  /**
   * ReleaseRevision
   *
   * A number identifying the Helm revision to which to rollback.
   *
   * @generated from field: int32 release_revision = 2;
   */
  releaseRevision = 0;

  constructor(data?: PartialMessage<RollbackInstalledPackageRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName =
    "kubeappsapis.plugins.helm.packages.v1alpha1.RollbackInstalledPackageRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "installed_package_ref", kind: "message", T: InstalledPackageReference },
    { no: 2, name: "release_revision", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): RollbackInstalledPackageRequest {
    return new RollbackInstalledPackageRequest().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): RollbackInstalledPackageRequest {
    return new RollbackInstalledPackageRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): RollbackInstalledPackageRequest {
    return new RollbackInstalledPackageRequest().fromJsonString(jsonString, options);
  }

  static equals(
    a: RollbackInstalledPackageRequest | PlainMessage<RollbackInstalledPackageRequest> | undefined,
    b: RollbackInstalledPackageRequest | PlainMessage<RollbackInstalledPackageRequest> | undefined,
  ): boolean {
    return proto3.util.equals(RollbackInstalledPackageRequest, a, b);
  }
}

/**
 * RollbackInstalledPackageResponse
 *
 * Response for RollbackInstalledPackage
 *
 * @generated from message kubeappsapis.plugins.helm.packages.v1alpha1.RollbackInstalledPackageResponse
 */
export class RollbackInstalledPackageResponse extends Message<RollbackInstalledPackageResponse> {
  /**
   * TODO: add example for API docs
   * option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_schema) = {
   *   example: '{"installed_package_ref": {}}'
   * };
   *
   * @generated from field: kubeappsapis.core.packages.v1alpha1.InstalledPackageReference installed_package_ref = 1;
   */
  installedPackageRef?: InstalledPackageReference;

  constructor(data?: PartialMessage<RollbackInstalledPackageResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName =
    "kubeappsapis.plugins.helm.packages.v1alpha1.RollbackInstalledPackageResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "installed_package_ref", kind: "message", T: InstalledPackageReference },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): RollbackInstalledPackageResponse {
    return new RollbackInstalledPackageResponse().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): RollbackInstalledPackageResponse {
    return new RollbackInstalledPackageResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): RollbackInstalledPackageResponse {
    return new RollbackInstalledPackageResponse().fromJsonString(jsonString, options);
  }

  static equals(
    a:
      | RollbackInstalledPackageResponse
      | PlainMessage<RollbackInstalledPackageResponse>
      | undefined,
    b:
      | RollbackInstalledPackageResponse
      | PlainMessage<RollbackInstalledPackageResponse>
      | undefined,
  ): boolean {
    return proto3.util.equals(RollbackInstalledPackageResponse, a, b);
  }
}

/**
 * @generated from message kubeappsapis.plugins.helm.packages.v1alpha1.ImagesPullSecret
 */
export class ImagesPullSecret extends Message<ImagesPullSecret> {
  /**
   * @generated from oneof kubeappsapis.plugins.helm.packages.v1alpha1.ImagesPullSecret.docker_registry_credential_one_of
   */
  dockerRegistryCredentialOneOf:
    | {
        /**
         * docker credentials secret reference
         *
         * @generated from field: string secret_ref = 1;
         */
        value: string;
        case: "secretRef";
      }
    | {
        /**
         * docker credentials data
         *
         * @generated from field: kubeappsapis.core.packages.v1alpha1.DockerCredentials credentials = 2;
         */
        value: DockerCredentials;
        case: "credentials";
      }
    | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<ImagesPullSecret>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubeappsapis.plugins.helm.packages.v1alpha1.ImagesPullSecret";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: "secret_ref",
      kind: "scalar",
      T: 9 /* ScalarType.STRING */,
      oneof: "docker_registry_credential_one_of",
    },
    {
      no: 2,
      name: "credentials",
      kind: "message",
      T: DockerCredentials,
      oneof: "docker_registry_credential_one_of",
    },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ImagesPullSecret {
    return new ImagesPullSecret().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ImagesPullSecret {
    return new ImagesPullSecret().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ImagesPullSecret {
    return new ImagesPullSecret().fromJsonString(jsonString, options);
  }

  static equals(
    a: ImagesPullSecret | PlainMessage<ImagesPullSecret> | undefined,
    b: ImagesPullSecret | PlainMessage<ImagesPullSecret> | undefined,
  ): boolean {
    return proto3.util.equals(ImagesPullSecret, a, b);
  }
}

/**
 * HelmPackageRepositoryCustomDetail
 *
 * Custom details for a Helm repository
 *
 * @generated from message kubeappsapis.plugins.helm.packages.v1alpha1.HelmPackageRepositoryCustomDetail
 */
export class HelmPackageRepositoryCustomDetail extends Message<HelmPackageRepositoryCustomDetail> {
  /**
   * docker registry credentials for pull secrets
   *
   * @generated from field: kubeappsapis.plugins.helm.packages.v1alpha1.ImagesPullSecret images_pull_secret = 1;
   */
  imagesPullSecret?: ImagesPullSecret;

  /**
   * list of oci repositories
   *
   * @generated from field: repeated string oci_repositories = 2;
   */
  ociRepositories: string[] = [];

  /**
   * filter rule to apply to the repository
   *
   * @generated from field: kubeappsapis.plugins.helm.packages.v1alpha1.RepositoryFilterRule filter_rule = 3;
   */
  filterRule?: RepositoryFilterRule;

  /**
   * whether to perform validation on the repository
   *
   * @generated from field: bool perform_validation = 4;
   */
  performValidation = false;

  /**
   * the query options for the proxy call
   *
   * @generated from field: kubeappsapis.plugins.helm.packages.v1alpha1.ProxyOptions proxy_options = 5;
   */
  proxyOptions?: ProxyOptions;

  /**
   * selector which must be true for the pod to fit on a node
   *
   * @generated from field: map<string, string> node_selector = 6;
   */
  nodeSelector: { [key: string]: string } = {};

  /**
   * set of Pod's Tolerations
   *
   * @generated from field: repeated kubeappsapis.plugins.helm.packages.v1alpha1.Toleration tolerations = 7;
   */
  tolerations: Toleration[] = [];

  /**
   * defines the security options the container should be run with.
   *
   * @generated from field: kubeappsapis.plugins.helm.packages.v1alpha1.PodSecurityContext security_context = 8;
   */
  securityContext?: PodSecurityContext;

  constructor(data?: PartialMessage<HelmPackageRepositoryCustomDetail>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName =
    "kubeappsapis.plugins.helm.packages.v1alpha1.HelmPackageRepositoryCustomDetail";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "images_pull_secret", kind: "message", T: ImagesPullSecret },
    {
      no: 2,
      name: "oci_repositories",
      kind: "scalar",
      T: 9 /* ScalarType.STRING */,
      repeated: true,
    },
    { no: 3, name: "filter_rule", kind: "message", T: RepositoryFilterRule },
    { no: 4, name: "perform_validation", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 5, name: "proxy_options", kind: "message", T: ProxyOptions },
    {
      no: 6,
      name: "node_selector",
      kind: "map",
      K: 9 /* ScalarType.STRING */,
      V: { kind: "scalar", T: 9 /* ScalarType.STRING */ },
    },
    { no: 7, name: "tolerations", kind: "message", T: Toleration, repeated: true },
    { no: 8, name: "security_context", kind: "message", T: PodSecurityContext },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): HelmPackageRepositoryCustomDetail {
    return new HelmPackageRepositoryCustomDetail().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): HelmPackageRepositoryCustomDetail {
    return new HelmPackageRepositoryCustomDetail().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): HelmPackageRepositoryCustomDetail {
    return new HelmPackageRepositoryCustomDetail().fromJsonString(jsonString, options);
  }

  static equals(
    a:
      | HelmPackageRepositoryCustomDetail
      | PlainMessage<HelmPackageRepositoryCustomDetail>
      | undefined,
    b:
      | HelmPackageRepositoryCustomDetail
      | PlainMessage<HelmPackageRepositoryCustomDetail>
      | undefined,
  ): boolean {
    return proto3.util.equals(HelmPackageRepositoryCustomDetail, a, b);
  }
}

/**
 * RepositoryFilterRule
 *
 * JQ expression for filtering packages
 *
 * @generated from message kubeappsapis.plugins.helm.packages.v1alpha1.RepositoryFilterRule
 */
export class RepositoryFilterRule extends Message<RepositoryFilterRule> {
  /**
   * jq string expression
   *
   * @generated from field: string jq = 1;
   */
  jq = "";

  /**
   * map of variables
   *
   * @generated from field: map<string, string> variables = 4;
   */
  variables: { [key: string]: string } = {};

  constructor(data?: PartialMessage<RepositoryFilterRule>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubeappsapis.plugins.helm.packages.v1alpha1.RepositoryFilterRule";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "jq", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    {
      no: 4,
      name: "variables",
      kind: "map",
      K: 9 /* ScalarType.STRING */,
      V: { kind: "scalar", T: 9 /* ScalarType.STRING */ },
    },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RepositoryFilterRule {
    return new RepositoryFilterRule().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RepositoryFilterRule {
    return new RepositoryFilterRule().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): RepositoryFilterRule {
    return new RepositoryFilterRule().fromJsonString(jsonString, options);
  }

  static equals(
    a: RepositoryFilterRule | PlainMessage<RepositoryFilterRule> | undefined,
    b: RepositoryFilterRule | PlainMessage<RepositoryFilterRule> | undefined,
  ): boolean {
    return proto3.util.equals(RepositoryFilterRule, a, b);
  }
}

/**
 * ProxyOptions
 *
 * query options for a proxy call
 *
 * @generated from message kubeappsapis.plugins.helm.packages.v1alpha1.ProxyOptions
 */
export class ProxyOptions extends Message<ProxyOptions> {
  /**
   * if true, the proxy options will be taken into account
   *
   * @generated from field: bool enabled = 1;
   */
  enabled = false;

  /**
   * value for the HTTP_PROXY env variable passed to the Pod
   *
   * @generated from field: string http_proxy = 2;
   */
  httpProxy = "";

  /**
   * value for the HTTPS_PROXY env variable passed to the Pod
   *
   * @generated from field: string https_proxy = 3;
   */
  httpsProxy = "";

  /**
   * value for the NO_PROXY env variable passed to the Pod
   *
   * @generated from field: string no_proxy = 4;
   */
  noProxy = "";

  constructor(data?: PartialMessage<ProxyOptions>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubeappsapis.plugins.helm.packages.v1alpha1.ProxyOptions";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "enabled", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "http_proxy", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "https_proxy", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "no_proxy", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ProxyOptions {
    return new ProxyOptions().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ProxyOptions {
    return new ProxyOptions().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ProxyOptions {
    return new ProxyOptions().fromJsonString(jsonString, options);
  }

  static equals(
    a: ProxyOptions | PlainMessage<ProxyOptions> | undefined,
    b: ProxyOptions | PlainMessage<ProxyOptions> | undefined,
  ): boolean {
    return proto3.util.equals(ProxyOptions, a, b);
  }
}

/**
 * Toleration
 *
 * Extracted from the K8s API to avoid a dependency on the K8s API
 * https://github.com/kubernetes/api/blob/master/core/v1/generated.proto
 *
 * @generated from message kubeappsapis.plugins.helm.packages.v1alpha1.Toleration
 */
export class Toleration extends Message<Toleration> {
  /**
   * @generated from field: optional string key = 1;
   */
  key?: string;

  /**
   * @generated from field: optional string operator = 2;
   */
  operator?: string;

  /**
   * @generated from field: optional string value = 3;
   */
  value?: string;

  /**
   * @generated from field: optional string effect = 4;
   */
  effect?: string;

  /**
   * @generated from field: optional int64 toleration_seconds = 5;
   */
  tolerationSeconds?: bigint;

  constructor(data?: PartialMessage<Toleration>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubeappsapis.plugins.helm.packages.v1alpha1.Toleration";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "key", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 2, name: "operator", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 3, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 4, name: "effect", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 5, name: "toleration_seconds", kind: "scalar", T: 3 /* ScalarType.INT64 */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Toleration {
    return new Toleration().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Toleration {
    return new Toleration().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Toleration {
    return new Toleration().fromJsonString(jsonString, options);
  }

  static equals(
    a: Toleration | PlainMessage<Toleration> | undefined,
    b: Toleration | PlainMessage<Toleration> | undefined,
  ): boolean {
    return proto3.util.equals(Toleration, a, b);
  }
}

/**
 * PodSecurityContext
 *
 * Extracted from the K8s API to avoid a dependency on the K8s API
 * https://github.com/kubernetes/api/blob/master/core/v1/generated.proto
 *
 * @generated from message kubeappsapis.plugins.helm.packages.v1alpha1.PodSecurityContext
 */
export class PodSecurityContext extends Message<PodSecurityContext> {
  /**
   * @generated from field: optional int64 run_as_user = 1;
   */
  runAsUser?: bigint;

  /**
   * @generated from field: optional int64 run_as_group = 6;
   */
  runAsGroup?: bigint;

  /**
   * @generated from field: optional bool run_as_non_root = 3;
   */
  runAsNonRoot?: boolean;

  /**
   * @generated from field: repeated int64 supplemental_groups = 4;
   */
  supplementalGroups: bigint[] = [];

  /**
   * @generated from field: optional int64 f_s_group = 5;
   */
  fSGroup?: bigint;

  constructor(data?: PartialMessage<PodSecurityContext>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "kubeappsapis.plugins.helm.packages.v1alpha1.PodSecurityContext";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "run_as_user", kind: "scalar", T: 3 /* ScalarType.INT64 */, opt: true },
    { no: 6, name: "run_as_group", kind: "scalar", T: 3 /* ScalarType.INT64 */, opt: true },
    { no: 3, name: "run_as_non_root", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
    {
      no: 4,
      name: "supplemental_groups",
      kind: "scalar",
      T: 3 /* ScalarType.INT64 */,
      repeated: true,
    },
    { no: 5, name: "f_s_group", kind: "scalar", T: 3 /* ScalarType.INT64 */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PodSecurityContext {
    return new PodSecurityContext().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PodSecurityContext {
    return new PodSecurityContext().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): PodSecurityContext {
    return new PodSecurityContext().fromJsonString(jsonString, options);
  }

  static equals(
    a: PodSecurityContext | PlainMessage<PodSecurityContext> | undefined,
    b: PodSecurityContext | PlainMessage<PodSecurityContext> | undefined,
  ): boolean {
    return proto3.util.equals(PodSecurityContext, a, b);
  }
}
