<template>
  <v-card>
    <v-card-title>tiptap</v-card-title>
    <v-card-text>
      <editor-menu-bar :editor="editor" v-slot="{commands, isActive}">
        <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold"> Bold </button>
      </editor-menu-bar>
      <editor-content :editor="editor"></editor-content>
    </v-card-text>
  </v-card>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import { Bold, Italic, Link, HardBreak, Heading } from 'tiptap-extensions';
export default {
  components: { 
    EditorContent, 
    EditorMenuBar
  }, 
  data() { 
    return { 
      editor: new Editor({
        content: '<p>This is just a boring paragraph</p>',
        extensions: [
          new Heading({}), 
          new Bold(), 
          new Italic(), 
          new Link(), 
          new HardBreak(),
        ]
      }) , 
    } 
  }, 
  mounted() { 
    // this.editor = 
  }, 
  beforeDestroy() { 
    this.editor.destroy() 
  },

}
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }
}

.bubble-menu {
  display: flex;
  background-color: #0D0D0D;
  padding: 0.2rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    color: #FFF;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}

.floating-menu {
  display: flex;
  background-color: #0D0D0D10;
  padding: 0.2rem;
  border-radius: 0.5rem;

  button {
    border: none;
    background: none;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;

    &:hover,
    &.is-active {
      opacity: 1;
    }
  }
}
</style>