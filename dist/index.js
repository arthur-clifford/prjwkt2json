'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class SRTextParser {
    constructor() {
        this.text = '';
        this.result = {};
        this.buffer = '';
        this.mode = 'start';
        this.depth = 0;
        this.depths = [];
    }
    Parse(what) {
        this.result = {};
        this.text = what;
        this.currentData = this.result;
        this.buffer = '';
        this.depths = [];
        this.depth = 0;
        this.depths.push(this.currentData);
        for (const char of this.text) {
            switch (this.mode) {
                case 'start':
                    if (char !== '[') {
                        this.buffer += char;
                    }
                    else {
                        const data = {};
                        this.currentData[this.buffer] = data;
                        this.depths.push(this.currentData[this.buffer]);
                        this.currentData = data;
                        this.buffer = '';
                        this.mode = 'groupContent';
                        this.depth += 1;
                    }
                    break;
                case 'groupContent':
                    if (char === '"') {
                        this.mode = 'quotedItem';
                    }
                    else if (char === ']') {
                        if (this.buffer !== '') {
                            if (!(this.currentData['values'])) {
                                this.currentData['values'] = [];
                            }
                            this.currentData.values.push(this.buffer);
                        }
                        this.buffer = '';
                        if (this.depth > 0) {
                            this.depths.pop();
                            this.depth -= 1;
                            this.currentData = this.depths[this.depth];
                        }
                    }
                    else if (char !== '[') {
                        if (char === ',') {
                            if (this.buffer !== '') {
                                if (!(this.currentData['values'])) {
                                    this.currentData['values'] = [];
                                }
                                this.currentData.values.push(this.buffer);
                                this.buffer = '';
                            }
                            continue;
                        }
                        this.buffer += char;
                    }
                    else {
                        const data = {};
                        if (!!this.currentData[this.buffer]) {
                            if (Array.isArray(this.currentData[this.buffer])) {
                                this.currentData[this.buffer].push(data);
                            }
                            else {
                                const currentItem = this.currentData[this.buffer];
                                this.currentData[this.buffer] = [currentItem];
                                this.currentData[this.buffer].push(data);
                            }
                        }
                        else {
                            this.currentData[this.buffer] = data;
                        }
                        this.depths.push(this.currentData[this.buffer]);
                        this.currentData = data;
                        this.buffer = '';
                        this.mode = 'groupContent';
                        this.depth += 1;
                    }
                    break;
                case 'quotedItem':
                    if (char !== '"') {
                        this.buffer += char;
                    }
                    else {
                        if (this.depth > 0) {
                            this.mode = 'groupContent';
                            if (!!this.currentData['label']) {
                                if (!this.currentData['values']) {
                                    this.currentData['values'] = [];
                                }
                                this.currentData['values'].push(this.buffer);
                            }
                            else {
                                this.currentData['label'] = this.buffer.replace(/_/g, ' ');
                            }
                        }
                        this.buffer = '';
                    }
                    break;
            }
        }
        this.result = this.currentData;
        return this.currentData;
    }
}

exports.SRTextParser = SRTextParser;
//# sourceMappingURL=index.js.map
