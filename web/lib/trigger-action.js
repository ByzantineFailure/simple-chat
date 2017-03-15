const eventType = require('./constants').actionEventType;

function triggerAction(action) {
    const trigger = new CustomEvent(eventType, { detail: action });
    window.dispatchEvent(trigger);
}

module.exports = triggerAction;

