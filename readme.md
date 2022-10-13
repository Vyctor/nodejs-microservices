#

## Kubernetes

### Kubernetes terminology

- Cluster
  - A collection of nodes with a master to manage them
- Node
  - A virtual machine that will run our containers
- Pod
  - More or less a running container. Technically, a pod can run multiple containers
- Deployment
  - Monitors a set of pods, make sure they are running and restarts them if they crash
- Service
  - Provides an easy-to-remember URL to access a running container.

### Types of services

#### Cluster IP

Sets up a easy-to-remember URL to access a pod. Only exposes pods in the cluster.

#### Node Port

Makes a pod accessible from outside the cluster. Usually only used for dev purposes.

#### Load Balancer

Makes a pod accessible from outside the cluster. This is the right way to expose a pod to the outside world.

#### External Name

Redirect an in-cluster request to a CNAME url.
