---
title: Email Verification
layout: default
---

# Email Verification

Vista donde el usuario debe verificar su email de registro mediante el código enviado por **Arzov**. También puede pedir un nuevo código en caso de no recibirlo.

<figure id="emailVerificationPage" class="content-img">
    <figcaption><b></b></figcaption>
    <input type="checkbox" id="zoom">
    <label for="zoom">
        <img>
    </label>
</figure>

<br>

### EmailVerificationMain
<code id="cp-email-verification-main">pages\email_verification\index.vue</code>
<img class="copy-btn" data-clipboard-target="#cp-email-verification-main">

Vista principal que decide cual componente inicializar mobile o desktop. También gatillar la verificación del email del usuario o reenviar nuevo código de validación.

<br>

**LINKED COMPONENTS**

[EmailVerificationMobile](#emailverificationmobile)

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
      <tr>
        <td><code><par>userData</par></code></td>
        <td><code><type>object</type></code></td>
        <td>Información del usuario.</td>
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

Captura eventos generado por el componente [EmailVerificationMobile](#emailverificationmobile). Según los valores retornados puede verificar el email o reenviar un nuevo código de verificación.

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

### EmailVerificationMobile
<code id="cp-email-verification-mobile">pages\email_verification\mobile\index.vue</code>
<img class="copy-btn" data-clipboard-target="#cp-email-verification-mobile">

Componente de la vista [EmailVerification](#email-verification) para dispositivos móviles.

<br>

**LINKED COMPONENTS**

[//]: // TODO: Apuntar a los links correctos
[CodeInput](#)

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
        <td>Evento a emitir hacia vista <a href="#emailverificationmain">EmailVerificationMain</a>.</td>
        <td>
        </td>
      </tr>
      <tr>
        <td><code><par>userData</par></code></td>
        <td><code><type>object</type></code></td>
        <td>Información del usuario.</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</div>

<br>

**COMPUTED**

<div id="js" class="highlight">
<code>
<fn>email</fn>() => <type>string</type>
</code>
</div>

Retorna email del usuario desde datos del store.

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
        <td><code><type>string</type></code></td>
        <td>Email del usuario.</td>
      </tr>
    </tbody>
  </table>
</div>

<br>

**METHODS**

<div id="js" class="highlight">
<code>
<fn>verify</fn>(<par>event</par>) => <type>void</type>
</code>
</div>

Emite evento para verificar el email.

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
        <td>Evento del formulario.</td>
      </tr>
    </tbody>
  </table>
</div>

<br>

<div id="js" class="highlight">
<code>
<fn>resendCode</fn>() => <type>void</type>
</code>
</div>

Emite evento para reenviar código de verificación.