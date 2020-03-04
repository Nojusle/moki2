https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-on-digitalocean-kubernetes-using-helm

# install helmet on local machine

```
cd /tmp
```

```
curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > install-helm.sh
```

```
chmod u+x install-helm.sh
```

```
./install-helm.sh
```

# install tiller on kubernetes cluster

```
kubectl -n kube-system create serviceaccount tiller
```

```
kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
```

```
helm init --service-account tiller
```

# install nginx

```
helm install stable/nginx-ingress --name nginx-ingress --set controller.publishService.enabled=true

WAIT!!!!
```

<!-- helm uninstall nginx-ingress -->

# add domain to the app (no ssl/tsl)

```
kubectl create -f ingress_no_tsl.yml
```

# add tsl certificate manager

```
kubectl apply --validate=false -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.13/deploy/manifests/00-crds.yaml
```

```
kubectl create namespace cert-manager
```

```
helm repo add jetstack https://charts.jetstack.io
```

WAIT!!!

```
helm install --name cert-manager --version v0.13.0 --namespace cert-manager jetstack/cert-manager
```

<!-- kubectl create -f production_issuer.yml -->

```
kubectl apply -f production_issuer.yml
```

# update add domain to app (with ssl/tsl)

```
kubectl delete -f ingress_no_tsl.yml
```

```
kubectl apply -f ingress.yml
```

- WAIT!!! for letsencrypt to issue sertificate
- kubectl describe certificate kubernetes-tls

```
kubectl describe certificate kubernetes
```
