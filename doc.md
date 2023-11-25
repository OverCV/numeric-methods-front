# Instalación NG
Primero el CLI
```bash
npm install -g @angular/cli
```
Luego el proyecto (mejor con ruteo ya hecho)
```bash
ng new <frontend>
```

Si el proyecto ya está generado entonces sólo hacer uso de `npm i` para instalar las dependencias.

Se accede a la carpeta del proyecto `cd <frontend>`.

## NG Material
```bash
ng add @angular/material
```
## Bulma CSS
```bash
npm install bulma
```
Para usarla en el proyecto, en el `angular.json`:
```json
"styles": [
  "node_modules/bulma/css/bulma.css",
  "src/styles.css"
],
```
y con esto ya se puede usar en los componentes.

### Estructura
Ahora el ruteo del archivo `app-routing.module.ts`:
```typescript
const routes: Routes = [
  { path: '', redirectTo: '/board', pathMatch: 'full' },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Luego creamos los servicios en `src/app/services`:
```bash
ng g s services/<dto/graph>
```
Para separar los DTO de por ejemplo un modal.
Ahora un directorio con elementos globales que se llame common en `src/app/common`:

Luego podemos un modulo compartido con
```bash
ng generate module modules/shared --module=app
```
Con el fin de tener allí los componentes que se usen en toda la aplicación.
Ahora los instalamos en el `app.module.ts`:

