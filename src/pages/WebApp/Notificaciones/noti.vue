<template>
    <div>
    <h1>Pusher Test</h1>
    <p>
        Publish an event to channel <code>my-channel</code>
        with event name <code>my-event</code>; it will appear below:
    </p>  
        <ul>
        <li v-for="(message,i) in messages" :key="i">
            {{message}}
        </li>
        </ul>
    </div>
</template>
  <script src="https://js.pusher.com/7.0/pusher.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('5cfbe108b5b06bd78e57', {
      cluster: 'us2'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      app.messages.push(JSON.stringify(data));
    });
    export default {
      data: {
        messages: [],
      },
    });
  </script>
</body>