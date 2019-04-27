<template>
  <li class="sidebar-item">
    <div class="contact-list-item clickable">
      {{ contact.username }}
      <div>
        <small>{{ contact.email }}</small>
      </div>
    </div>
  </li>
</template>

<script>
import Requests from "../mixins/requests.js";

export default {
  props: {
    conversationItem: {
      type: Object,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    },
    token: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      state: {
        errors: [],
        show: true
      },
      contact: {}
    };
  },
  methods: {},
  created() {
    const currentUserIndex = findWithAttr(
      this.conversationItem.participants,
      "email",
      this.currentUser.email
    );
    this.contact = this.conversationItem.participants[currentUserIndex === 0 ? 1 : 0];
  },
  mixins: [Requests]
};

function findWithAttr(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}
</script>

<style scoped>
.contact-list-item {
  color: #cecece;
  margin-left: 1.5em;
}

.sidebar-item {
  margin-bottom: 5px;
}

.sidebar-item:hover {
  background-color: #1a1a29;
}

.clickable {
  cursor: pointer;
}
</style>