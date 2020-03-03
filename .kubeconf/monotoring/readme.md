# Monotoring

https://www.digitalocean.com/community/tutorials/how-to-set-up-digitalocean-kubernetes-cluster-monitoring-with-helm-and-prometheus-operator

helm install --namespace monitoring --name doks-cluster-monitoring -f custom-values.yaml stable/prometheus-operator

kubectl port-forward -n monitoring svc/doks-cluster-monitoring-grafana 8000:80
