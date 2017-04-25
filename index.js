const graphlib = require('graphlib');

const Graph = graphlib.Graph;

const metro = new Graph({ directed: false });

metro.setNode('117', {
  label: 'Vokzalna',
  line: 'red',
});

metro.setNode('118', {
  label: 'Universitet',
  line: 'red',
});

metro.setNode('119', {
  label: 'Teatralna',
  line: 'red',
});

metro.setNode('120', {
  label: 'Khreshatyk',
  line: 'red',
});

metro.setNode('121', {
  label: 'Arsenalna',
  line: 'red',
});

metro.setNode('122', {
  label: 'Dnipro',
  line: 'red',
});

metro.setNode('312', {
  label: 'Lukianivska',
  line: 'green',
});

metro.setNode('314', {
  label: 'Zoloti Vorota',
  line: 'green',
});

metro.setNode('315', {
  label: 'Palats Sportu',
  line: 'green',
});

metro.setNode('316', {
  label: 'Klovska',
  line: 'green',
});

metro.setNode('317', {
  label: 'Pecherska',
  line: 'green',
});

metro.setNode('216', {
  label: 'Poshtova ploscha',
  line: 'blue',
});

metro.setNode('217', {
  label: 'Maydan Nezaleznosti',
  line: 'blue',
});

metro.setNode('218', {
  label: 'Plosha Lva Tolstoho',
  line: 'blue',
});

metro.setNode('219', {
  label: 'Olimpiyska',
  line: 'blue',
});

metro.setNode('220', {
  label: 'Palats Ukraina',
  line: 'blue',
});

metro.setNode('221', {
  label: 'Lybidska',
  line: 'blue',
});

metro.setNode('222', {
  label: 'Demiivska',
  line: 'blue',
});

metro.setNode('223', {
  label: 'Holosyyvska',
  line: 'blue',
});

metro.setDefaultEdgeLabel(1);

metro.setEdge('117', '118');
metro.setEdge('118', '119');
metro.setEdge('119', '120');
metro.setEdge('120', '121');
metro.setEdge('121', '122');

metro.setEdge('312', '314');
metro.setEdge('314', '315');
metro.setEdge('315', '316');
metro.setEdge('316', '317');

metro.setEdge('216', '217');
metro.setEdge('217', '218');
metro.setEdge('218', '219');
metro.setEdge('219', '220');
metro.setEdge('220', '221');
metro.setEdge('221', '222');
metro.setEdge('222', '223');

metro.setEdge('119', '314', .5);
metro.setEdge('120', '217', .5);
metro.setEdge('218', '315', .5);

// https://github.com/cpettitt/graphlib/issues/42
const nodeEdges = v => metro.nodeEdges(v);
const weight = e => metro.edge(e);

const from = '223';
const to = '312';

const ways = graphlib.alg.dijkstra(metro, from, weight, nodeEdges);
const target = ways[to];

const stationKeys = [to];

let { predecessor } = target;

/* create path and on start page there will be no property 'predecessor' */
do {
  stationKeys.push(predecessor);
  predecessor = ways[predecessor].predecessor;
} while (predecessor);

const path = stationKeys.reverse();

console.log(path);
const helpMessage = path.reduce((acc, cur, i) => {

  const { line, label } = metro.node(cur);

  if (i === 0) {
    return `${acc}Start on ${label}\n`;
  }

  return `${acc}Next go to ${label}\n`;
}, '');

console.log(helpMessage);
