
# Experiment Registry Common Service

```
Author: Jun Zheng (me at jackzh dot com)
```

Micro-service to register experiments.

## Quick Start

To run this package, first copy `.env.example` to `.env` by typing the following command

```bash
$ cp .env.example .env
```

Then edit `.env` file to match your local setup.

Finally, run `npm install && npm start` to run the development environment.

## API Reference

### Register an Experiment

POST `/experiments`

Request

```json
{
  "name": "amazing",
  "author": "Jun Zheng",
  "templateSource": "<div class=\"simple-button\">\n    <button\n        v-on:click=\"onClick\"\n        v-on:mousedown=\"onMouseDown\"\n        v-on:mouseup=\"onMouseUp\"\n        v-on:mousemove=\"onMouseMove\"\n        v-bind:style=\"{ width: inputs.width + 'px', height: inputs.height + 'px' }\"\n    >\n        {{ inputs.text }}\n    </button>\n</div>",
  "scriptSource": "export default {\n    data: {\n        \n    },\n    inputs: {\n        width: 100,\n        height: 100,\n        text: \"Click Here!\"\n    },\n    outputs: {\n        numClicks: 0,\n        lastMouseDownTime: new Date(0).getTime(),\n        lastMouseUpTime: new Date(0).getTime(),\n        lastHoverLocation: {x: 0, y: 0},\n    },\n    methods: {\n        onClick: function() {\n            this.outputs.numClicks += 1;\n        },\n        onMouseDown: function() {\n            this.outputs.lastMouseDownTime = new Date().getTime();\n        },\n        onMouseUp: function() {\n            this.outputs.lastMouseUpTime = new Date().getTime();\n        },\n        onMouseMove: function(e) {\n            this.outputs.lastHoverLocation = {\n                x: e.clientX,\n                y: e.clientY,\n            }\n        }\n    }\n}"
}
```

Response

```json
{
    "name": "amazing",
    "author": "Jun Zheng",
    "uuid": "b767a634-bebc-4ac0-ac87-c88f1fd9eaf0"
}
```

### Get an Experiment

GET `/experiments/:uuid`

Response

```json
{
    "name": "amazing",
    "author": "Jun Zheng",
    "uuid": "b767a634-bebc-4ac0-ac87-c88f1fd9eaf0"
}
```

### Update a Experiment

PATCH `/experiments/:uuid`

Request

```json
{
	"name": "amother experiment!!"
}
```

Response

```json
{
    "name": "amother experiment!!",
    "author": "Jun Zheng",
    "uuid": "d4673480-e73f-42bc-ba8d-346dcdccaed9"
}
```

### Get Experiment Sources

GET `/widgets/:uuid/templateSource`

GET `/widgets/:uuid/scriptSource`