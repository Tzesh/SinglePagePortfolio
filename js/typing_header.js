// ugurdindar.com - typing header source code

async function init() { // initialize function
    const node = document.querySelector("#type-text");

    await sleep(1000);
    node.innerText = "";
    await node.type('Hello, ');

    while (true) { // typing and deleting words in this loop to make that all natural
        await node.type('World');
        await sleep(2000);
        await node.delete('World');
        await node.type('I\'m Tzesh');
        await sleep(2000);
        await node.delete('I\'m Tzesh');
    }
}

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

class TypeAsync extends HTMLSpanElement {
    get typeInterval() {
        const randomMs = 100 * Math.random();
        return randomMs < 50 ? 10 : randomMs;
    }

    async type(text) { // typing function
        for (let character of text) {
            this.innerText += character;
            await sleep(this.typeInterval);
        }
    }

    async delete(text) { // deleting function
        for (let character of text) {
            this.innerText = this.innerText.slice(0, this.innerText.length - 1);
            await sleep(this.typeInterval);
        }
    }
}

customElements.define('type-async', TypeAsync, { extends: 'span' });


init();