export class SRTextParser {
  private text: string = '';
  private result: any = {};
  private currentData: any;
  private buffer = '';
  private mode: string = 'start'
  private depth = 0;
  private depths: Array<any> = [];
  Parse(what: string) {
    this.text = what;
    this.currentData = this.result;
    this.buffer = '';
    this.depths.push(this.currentData);
    for (const char of this.text) {
      switch (this.mode) {
        case 'start':
          if (char !== '[') {
            this.buffer += char;
          } else {
            const data: any = {};
            this.currentData[this.buffer] = data;
            this.currentData = data;
            this.buffer = '';
            this.mode = 'groupContent';
            this.depth += 1;
            this.depths.push(this.currentData);            
          }
          break;
        case 'groupContent':
          if (char === '"') {
            this.mode = 'quotedItem';
          } else if (char === ']') {
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
          } else if (char !== '[') {
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
          } else {
            const data: any = {}
            this.currentData[this.buffer] = data;
            this.depths.push(this.currentData);
            this.currentData = data;
            this.buffer = '';
            this.mode = 'groupContent';
            this.depth += 1;            
          }
          break;
        case 'quotedItem':
          if (char !== '"') {
            this.buffer += char;
          } else {

            if (this.depth > 0) {
              this.mode = 'groupContent'
              this.currentData['label'] = this.buffer.replace(/_/g,' ');

            }
            this.buffer = '';

          }
          break;
      }
    }
    return this.result;
  }  
}
