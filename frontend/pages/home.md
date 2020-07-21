---
title: Home
layout: default
---

# Home

Vista inicial de la app donde el usuario tiene la funcionalidad de buscar rivales cercanos y enlistarlos. El usuario puede enviar una solicitud de _match_ a cada rival.

<figure id="homePage" class="content-img">
    <figcaption><b></b></figcaption>
    <input type="checkbox" id="zoom">
    <label for="zoom">
        <img>
    </label>
</figure>

<br>

### HomeMain
<code id="cp-home-main">pages\home\index.vue</code>
<img class="copy-btn" data-clipboard-target="#cp-home-main">

Vista principal que decide cual componente inicializar mobile o desktop. También permite buscar rivales cercanos o enviar una solicitud de match a un rival.

<br>

**LINKED COMPONENTS**

[HomeMobile](#homemobile)

<br>

**DATA**

<div id="js" class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th>Field</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code><par>event</par></code></td>
        <td><code><type>object</type></code></td>
        <td>Evento que puede emitir el componente.</td>
      </tr>
    </tbody>
  </table>
</div>

<br>

**COMPUTED**

<div id="js" class="highlight">
<code>
<fn>userData</fn>() => <type>object</type>
</code>
</div>

Retorna información del usuario desde store.

<b>Returns</b>
<div id="js" class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code><type>object</type></code></td>
        <td>Información del usuario.</td>
      </tr>
    </tbody>
  </table>
</div>

<br>

<div id="js" class="highlight">
<code>
<fn>usersFound</fn>() => <type>array[object]</type>
</code>
</div>

Retorna listado de rivales cercanos.

<b>Returns</b>
<div id="js" class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code><type>array[object]</type></code></td>
        <td>Listado de rivales cercanos.</td>
      </tr>
    </tbody>
  </table>
</div>

<br>

<div id="js" class="highlight">
<code>
<fn>searchingUsers</fn>() => <type>boolean</type>
</code>
</div>

Indicador de búsqueda de rivales.

<b>Returns</b>
<div id="js" class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code><type>boolean</type></code></td>
        <td>Indicador de búsqueda de rivales.</td>
      </tr>
    </tbody>
  </table>
</div>

<br>

**METHODS**

<div id="js" class="highlight">
<code>
<fn>onEmit</fn>(<par>event</par>) => <type>void</type>
</code>
</div>

Captura eventos generado por el componente [HomeMobile](#homemobile). Según los valores retornados puede buscar rivales cercanos o enviar una solicitud a un rival.

<b>Parameters</b>
<div id="js" class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th>Field</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code><par>event</par></code></td>
        <td><code><type>object</type></code></td>
        <td>Evento emitido por el componente.</td>
      </tr>
    </tbody>
  </table>
</div>

<br>

### HomeMobile
<code id="cp-email-verification-mobile">pages\home\mobile\index.vue</code>
<img class="copy-btn" data-clipboard-target="#cp-email-verification-mobile">

Componente de la vista [Home](#home) para dispositivos móviles.

<br>

**LINKED COMPONENTS**

[//]: // TODO: Apuntar a los links correctos
[ProfileImage](#) \| [UserSearchCard](#) \| [Geolocatio](#)

<br>

**PROPS**

<div id="js" class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th>Field</th>
        <th>Type</th>
        <th>Description</th>
        <th>Values</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code><par>event</par></code></td>
        <td><code><type>object</type></code></td>
        <td>Evento a emitir hacia vista <a href="#homemain">HomeMain</a>.</td>
        <td>
        </td>
      </tr>
      <tr>
        <td><code><par>usersFound</par></code></td>
        <td><code><type>array[object]</type></code></td>
        <td>Listado de rivales cercanos.</td>
        <td></td>
      </tr>
      <tr>
        <td><code><par>userData</par></code></td>
        <td><code><type>object</type></code></td>
        <td>Información del usuario.</td>
        <td></td>
      </tr>
      <tr>
        <td><code><par>searchingUsers</par></code></td>
        <td><code><type>boolean</type></code></td>
        <td>Indicador de búsqueda de rivales.</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</div>

<br>

**METHODS**

<div id="js" class="highlight">
<code>
<fn>searchMatch</fn>() => <type>void</type>
</code>
</div>

Emite evento para buscar rivales.

<br>

<div id="js" class="highlight">
<code>
<fn>requestMatch</fn>(rangeKey, firstName, picture, index) => <type>void</type>
</code>
</div>

Emite evento para enviar solicitud de match a un rival.

<b>Parameters</b>
<div id="js" class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th>Field</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code><par>rangeKey</par></code></td>
        <td><code><type>string</type></code></td>
        <td>Email del rival.</td>
      </tr>
      <tr>
        <td><code><par>firstName</par></code></td>
        <td><code><type>string</type></code></td>
        <td>Nombre del rival.</td>
      </tr>
      <tr>
        <td><code><par>picture</par></code></td>
        <td><code><type>string</type></code></td>
        <td>URL de la foto de perfil del rival.</td>
      </tr>
      <tr>
        <td><code><par>index</par></code></td>
        <td><code><type>integer</type></code></td>
        <td>Índice del rival en listado de rivales cercanos.</td>
      </tr>
    </tbody>
  </table>
</div>