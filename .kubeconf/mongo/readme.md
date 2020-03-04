install mongo

https://github.com/helm/charts/tree/master/stable/mongodb-replicaset
https://www.digitalocean.com/community/tutorials/how-to-scale-a-node-js-application-with-mongodb-on-kubernetes-using-helm

```
helm install --name mongo stable/mongodb-replicaset
```

```
openssl rand -base64 756 > key.txt
```

```
kubectl create secret generic keyfilesecret --from-file=key.txt
```

```
rm key.txt
```

```
echo -n 'nojus' | base64
```

== bm9qdXM=

```
echo -n 'nojus123' | base64
```

== bm9qdXMxMjM=

```
kubectl create -f secret.yaml
```

```
helm install --name mongo -f mongodb-values.yaml stable/mongodb-replicaset
```
