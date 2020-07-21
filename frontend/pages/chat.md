---
title: Chat
layout: default
---

# Chat

Vista donde el usuario puede conversar con sus rivales, acordar fechas y canchas donde realizar el partido de fútbol o _match_.

<figure id="chatPage" class="content-img">
    <figcaption><b></b></figcaption>
    <input type="checkbox" id="zoom">
    <label for="zoom">
        <img>
    </label>
</figure>

<br>

### ChatMain
<code id="cp-chat-main-path">pages\chat\index.vue</code>
<img class="copy-btn" data-clipboard-target="#cp-chat-main-path">

Vista principal que decide cual componente inicializar mobile o desktop. También gatillar el evento para agregar un mensaje en el chat.

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
        <td>Evento para emitir desde componente.</td>
      </tr>
      <tr>
        <td><code><par>matchInfo</par></code></td>
        <td><code><type>object</type></code></td>
        <td>Información del match obtenida desde el store.</td>
      </tr>
    </tbody>
  </table>
</div>

<br>

**COMPUTED**

<div id="js" class="highlight">
<code>
<fn>messagesList</fn>() => <type>array[object]</type>
</code>
</div>

Obtiene mensajes del chat desde el store, los transforma y elimina duplicados.

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
        <td>Listado de mensajes del chat transformado.</td>
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

Captura evento generado por el componente [ChatMobile](#chatmobile) para agregar mensaje en el chat.

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

<div id="js" class="highlight">
<code>
<fn>removeDups</fn>(<par>messages</par>) => <type>array[object]</type>
</code>
</div>

Elimina mensajes duplicados desde un arreglo.

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
        <td><code><par>messages</par></code></td>
        <td><code><type>array[object]</type></code></td>
        <td>Listado de mensajes a eliminar duplicados.</td>
      </tr>
    </tbody>
  </table>
</div>

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
        <td>Listado de mensajes sin duplicados.</td>
      </tr>
    </tbody>
  </table>
</div>

<br>

### ChatMobile
<code id="cp-chat-mobile-path">pages\chat\mobile\index.vue</code>
<img class="copy-btn" data-clipboard-target="#cp-chat-mobile-path">

Componente de la vista [Chat](#chat) para dispositivos móviles.

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
        <td>Evento a emitir hacia vista <a href="#chatmain">ChatMain</a>.</td>
        <td>
        </td>
      </tr>
      <tr>
        <td><code><par>matchInfo</par></code></td>
        <td><code><type>object</type></code></td>
        <td>Información básica del match para mostrar en el chat (foto de perfil del rival, nombre del rival).</td>
        <td></td>
      </tr>
      <tr>
        <td><code><par>messagesList</par></code></td>
        <td><code><type>array[string]</type></code></td>
        <td>Listado de mensajes del chat.</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</div>

<br>

**METHODS**

<div id="js" class="highlight">
<code>
<fn>addMessage</fn>(<par>message</par>) => <type>void</type>
</code>
</div>

Emite evento para enviar mensaje.

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
        <td><code><par>message</par></code></td>
        <td><code><type>string</type></code></td>
        <td>Mensaje a enviar.</td>
      </tr>
    </tbody>
  </table>
</div>

<br>

<div id="js" class="highlight">
<code>
<fn>scrollToLastMessage</fn>() => <type>void</type>
</code>
</div>

Desplaza la vista al último mensaje enviado.