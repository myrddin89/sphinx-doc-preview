'use babel';

import SphinxDocPreviewView from './sphinx-doc-preview-view';
import { CompositeDisposable } from 'atom';

export default {

  sphinxDocPreviewView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.sphinxDocPreviewView = new SphinxDocPreviewView(state.sphinxDocPreviewViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.sphinxDocPreviewView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'sphinx-doc-preview:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.sphinxDocPreviewView.destroy();
  },

  serialize() {
    return {
      sphinxDocPreviewViewState: this.sphinxDocPreviewView.serialize()
    };
  },

  toggle() {
    console.log('SphinxDocPreview was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
