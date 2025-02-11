import { JSONUtilities } from 'amplify-cli-core';
import { Input } from '../input';

const containsToRedact = ['key', 'id', 'password', 'name', 'arn', 'address', 'app'];
const quotes = '\\\\?"';
const keyMatcher = `\\w*?(${containsToRedact.join('|')})\\w*?`;
const completeMatch = `${quotes}(${keyMatcher})${quotes}:\\s?${quotes}([^!\\\\?"]+)${quotes}`;
//matches any string with contiansToRedact in it
const keyregex = new RegExp(keyMatcher, 'gmi');
// matches any json and gives values in json
const jsonregex = new RegExp(completeMatch, 'gmi');
function testReplaceJsonValues(json: string, redactedInput: string): string {
  if (!json) return json;
  let s: string = json.toString();
  if (jsonregex.test(s)) {
    jsonregex.lastIndex = 0;
    let m: RegExpExecArray | null;
    const valuesToRedact: any = [];

    //find all values to redact
    do {
      m = jsonregex.exec(s);
      if (m != null) {
        valuesToRedact.push(m[3]);
      }
    } while (m !== null);

    //replace them
    valuesToRedact.forEach(val => {
      s = s.replace(val, redactedInput);
    });
  } else {
    return json;
  }
  return s;
}

export default function redactInput(originalInput: Input, deleteArgAndOption: boolean, replacementString = '************'): Input {
  const input: Input = JSONUtilities.parse(JSONUtilities.stringify(originalInput)!);
  const argv = input.argv;
  const length = argv.length;
  let redactString = false;
  if (deleteArgAndOption) {
    input.argv = [];
    delete input.options;
    return input;
  }
  for (let i = 0; i < length; i++) {
    argv[i] = testReplaceJsonValues(argv[i], replacementString);
    if (redactString) {
      if (!isJson(argv[i])) argv[i] = replacementString;
      redactString = false;
      continue;
    }
    if (!isJson(argv[i]) && keyregex.test(argv[i])) {
      redactString = true;
      continue;
    }
  }
  if (input.options) {
    Object.keys(input.options).forEach(key => {
      if (key && input.options && input.options[key] && typeof input.options[key] === 'string') {
        if (keyregex.test(key) && !isJson(input.options[key].toString())) {
          input.options[key] = replacementString;
        } else if (typeof input.options[key] === 'string') {
          input.options[key] = testReplaceJsonValues(input.options[key].toString(), replacementString);
        }
      }
    });
  }

  return input;
}

function isJson(s: string): boolean {
  try {
    JSONUtilities.parse(s);
    return true;
  } catch (_) {
    return false;
  }
}
