// Copyright 2021-2023 the Kubeapps contributors.
// SPDX-License-Identifier: Apache-2.0

package main

import (
	"context"
	"fmt"

	"github.com/bufbuild/connect-go"
	"github.com/vmware-tanzu/kubeapps/cmd/kubeapps-apis/gen/plugins/resources/v1alpha1"
	"github.com/vmware-tanzu/kubeapps/cmd/kubeapps-apis/plugins/pkg/connecterror"
	core "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	log "k8s.io/klog/v2"
)

// CreateSecret creates the secret in the given context if the user has the
// required RBAC
func (s *Server) CreateSecret(ctx context.Context, r *connect.Request[v1alpha1.CreateSecretRequest]) (*connect.Response[v1alpha1.CreateSecretResponse], error) {
	namespace := r.Msg.GetContext().GetNamespace()
	cluster := r.Msg.GetContext().GetCluster()
	log.InfoS("+resources CreateSecret ", "cluster", cluster, "namespace", namespace)

	typedClient, err := s.clientGetter.Typed(r.Header(), cluster)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, fmt.Errorf("unable to get the k8s client: '%w'", err))
	}

	_, err = typedClient.CoreV1().Secrets(namespace).Create(ctx, &core.Secret{
		TypeMeta: metav1.TypeMeta{
			Kind:       core.ResourceSecrets.String(),
			APIVersion: core.SchemeGroupVersion.WithResource(core.ResourceSecrets.String()).String(),
		},
		ObjectMeta: metav1.ObjectMeta{
			Namespace: namespace,
			Name:      r.Msg.GetName(),
		},
		Type:       k8sTypeForProtoType(r.Msg.GetType()),
		StringData: r.Msg.GetStringData(),
	}, metav1.CreateOptions{})
	if err != nil {
		return nil, connecterror.FromK8sError("get", "Namespace", namespace, err)
	}

	return connect.NewResponse(&v1alpha1.CreateSecretResponse{}), nil
}

func k8sTypeForProtoType(secretType v1alpha1.SecretType) core.SecretType {
	switch secretType {
	case v1alpha1.SecretType_SECRET_TYPE_OPAQUE_UNSPECIFIED:
		return core.SecretTypeOpaque
	case v1alpha1.SecretType_SECRET_TYPE_SERVICE_ACCOUNT_TOKEN:
		return core.SecretTypeServiceAccountToken
	case v1alpha1.SecretType_SECRET_TYPE_DOCKER_CONFIG:
		return core.SecretTypeDockercfg
	case v1alpha1.SecretType_SECRET_TYPE_DOCKER_CONFIG_JSON:
		return core.SecretTypeDockerConfigJson
	case v1alpha1.SecretType_SECRET_TYPE_BASIC_AUTH:
		return core.SecretTypeBasicAuth
	case v1alpha1.SecretType_SECRET_TYPE_SSH_AUTH:
		return core.SecretTypeSSHAuth
	case v1alpha1.SecretType_SECRET_TYPE_TLS:
		return core.SecretTypeTLS
	case v1alpha1.SecretType_SECRET_TYPE_BOOTSTRAP_TOKEN:
		return core.SecretTypeBootstrapToken
	}
	return core.SecretTypeOpaque
}

func protoTypeForK8sType(secretType core.SecretType) v1alpha1.SecretType {
	switch secretType {
	case core.SecretTypeOpaque:
		return v1alpha1.SecretType_SECRET_TYPE_OPAQUE_UNSPECIFIED
	case core.SecretTypeServiceAccountToken:
		return v1alpha1.SecretType_SECRET_TYPE_SERVICE_ACCOUNT_TOKEN
	case core.SecretTypeDockercfg:
		return v1alpha1.SecretType_SECRET_TYPE_DOCKER_CONFIG
	case core.SecretTypeDockerConfigJson:
		return v1alpha1.SecretType_SECRET_TYPE_DOCKER_CONFIG_JSON
	case core.SecretTypeBasicAuth:
		return v1alpha1.SecretType_SECRET_TYPE_BASIC_AUTH
	case core.SecretTypeSSHAuth:
		return v1alpha1.SecretType_SECRET_TYPE_SSH_AUTH
	case core.SecretTypeTLS:
		return v1alpha1.SecretType_SECRET_TYPE_TLS
	case core.SecretTypeBootstrapToken:
		return v1alpha1.SecretType_SECRET_TYPE_BOOTSTRAP_TOKEN
	}
	return v1alpha1.SecretType_SECRET_TYPE_OPAQUE_UNSPECIFIED
}

// GetSecretNames returns a map of secret names with their types for the given
// context if the user has the required RBAC.
func (s *Server) GetSecretNames(ctx context.Context, r *connect.Request[v1alpha1.GetSecretNamesRequest]) (*connect.Response[v1alpha1.GetSecretNamesResponse], error) {
	cluster := r.Msg.GetContext().GetCluster()
	namespace := r.Msg.GetContext().GetNamespace()
	log.InfoS("+resources GetSecretNames ", "cluster", cluster, "namespace", namespace)

	typedClient, err := s.clientGetter.Typed(r.Header(), cluster)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, fmt.Errorf("unable to get the k8s client: '%w'", err))
	}

	secretList, err := typedClient.CoreV1().Secrets(namespace).List(ctx, metav1.ListOptions{})
	if err != nil {
		return nil, connecterror.FromK8sError("list", "Secrets", "", err)
	}

	secrets := map[string]v1alpha1.SecretType{}
	for _, s := range secretList.Items {
		secrets[s.Name] = protoTypeForK8sType(s.Type)
	}

	return connect.NewResponse(&v1alpha1.GetSecretNamesResponse{
		SecretNames: secrets,
	}), nil
}
