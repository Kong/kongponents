# Local Development

While actively developing the new Kongponent, you use the [vuepress markdown](#developing-in-local-docs) file to test out and develop. You can also [yarn link](#developing-linked-to-app) the component and develop inside your app by following the below steps. 

## Developing in local docs
Navigate into the package you want to develop and run `yarn link`

```bash
$ cd packages/{%kongponent_name%}
$ yarn link
```
If done correctly you will see a success message

```bash
success Registered "@kongponents/{%kongponent_name%}".
You can now run `yarn link "@kongponents/{%kongponent_name%}"` in the projects where you want to use this package and it will be used instead.
```


## Developing linked to app
Inside the root of your application register the linked component

```bash
$ yarn link "@kongponents/{%kongponent_name%}"
```

Now you actively develop the new component from the kongponents repo inside your application. 
