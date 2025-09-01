const rates = [
  ["USD", "JPY", 110],
  ["JPY", "USD", 1 / 110],
  ["USD", "AUD", 1.45],
  ["AUD", "USD", 20 / 29],
  ["JPY", "GBP", 0.007],
  ["GBP", "JPY", 1000 / 7],
  ["USD", "GBP", 0.77],
  ["GBP", "USD", 100 / 77],
  ["GBP", "AUD", 145 / 77],
  ["AUD", "GBP", 77 / 145],
  ["AUD", "JPY", 2200 / 29],
  ["JPY", "AUD", 29 / 2200],
  ["USD", "USD", 1],
  ["EUR", "USD", 0], // unknown currency => 0
];

const devisions = [
  ["A", "B", "2.0"],
  ["B", "C", "3.0"],
];

// const find = ["GBP", "AUD"];
// (USD = 1), (JPY = 110);
// (USD = 1), (AUD = 1.45);
// (JPY = 1), (GBP = 0.007);
// (GBP = 1), (JPY = 142.85);

// GBP -> JPY -> USD -> AUD
// 1   -> 142.85 -> 0.00909090909090909*142.85=1.29863636 -> 1.29863636 * 1.45 = 1.88302272
class Graph {
  nodes = [];
  matrix = [];
  addOrGetNodeIndex(node) {
    const index = this.nodes.findIndex((ele) => ele === node);
    if (index > -1) return index;
    this.nodes.push(node);

    return this.nodes.length - 1;
  }
  addEdges(src, dst, value) {
    if (!this.matrix[src]) {
      this.matrix[src] = [];
    }
    if (!this.matrix[dst]) {
      this.matrix[dst] = [];
    }
    this.matrix[src][dst] = value;
    this.matrix[dst][src] = 1 / value;
  }

  printEdges() {
    console.log(this.nodes);
    console.log(this.matrix);
  }
  calculateRate(srcNode, dstNode) {
    let src = this.addOrGetNodeIndex(srcNode);
    let dst = this.addOrGetNodeIndex(dstNode);
    if (this.matrix[src][dst]) {
      return this.matrix[src][dst];
    }
    const visted = [src];
    let result = null;
    for (let _ = 0; _ < this.nodes.length; _++) {
      for (let j in this.nodes) {
        let val = this.matrix[src][j];
        if (
          src == j ||
          (visted.length > 1 && visted.includes(parseInt(j))) ||
          !val
        ) {
          continue;
        }
        result = result ? result * val : val;
        visted.push(parseInt(j));
        if (dst == j) {
          return result;
        }
        src = j;
        break;
      }
    }

    return 0;
  }
}
function runAlgForCurrency() {
  graph = new Graph();
  for (r of rates) {
    let src = graph.addOrGetNodeIndex(r[0]);
    let dst = graph.addOrGetNodeIndex(r[1]);
    graph.addEdges(src, dst, r[2]);
  }
  console.log(`GBP -> AUD`, graph.calculateRate("GBP", "AUD"));
  console.log(`AUD -> JPY`, graph.calculateRate("AUD", "JPY"));
  console.log(`USD -> JPY`, graph.calculateRate("USD", "JPY")); // expect 110 ≈ 110
  console.log(`JPY -> USD`, graph.calculateRate("JPY", "USD")); // expect 1/110 ≈ 0.00909090909090909

  console.log(`USD -> AUD`, graph.calculateRate("USD", "AUD")); // expect 29/20 ≈ 1.45
  console.log(`AUD -> USD`, graph.calculateRate("AUD", "USD")); // expect 20/29 ≈ 0.6896551724137931

  console.log(`JPY -> GBP`, graph.calculateRate("JPY", "GBP")); // expect 7/1000 ≈ 0.007
  console.log(`GBP -> JPY`, graph.calculateRate("GBP", "JPY")); // expect 1000/7 ≈ 142.85714285714286

  console.log(`USD -> GBP`, graph.calculateRate("USD", "GBP")); // expect 77/100 ≈ 0.77
  console.log(`GBP -> USD`, graph.calculateRate("GBP", "USD")); // expect 100/77 ≈ 1.2987012987012987

  console.log(`GBP -> AUD`, graph.calculateRate("GBP", "AUD")); // expect 145/77 ≈ 1.8831168831168832
  console.log(`AUD -> GBP`, graph.calculateRate("AUD", "GBP")); // expect 77/145 ≈ 0.5310344827586206

  console.log(`AUD -> JPY`, graph.calculateRate("AUD", "JPY")); // expect 2200/29 ≈ 75.86206896551724
  console.log(`JPY -> AUD`, graph.calculateRate("JPY", "AUD")); // expect 29/2200 ≈ 0.013181818181818182

  console.log(`USD -> USD`, graph.calculateRate("USD", "USD")); // expect 1 ≈ 1
  console.log(`EUR -> USD`, graph.calculateRate("EUR", "USD")); // expect 0 (unknown / not connected)

  graph.printEdges();
}
function runAlgForDevision() {
  graph = new Graph();
  for (r of devisions) {
    let src = graph.addOrGetNodeIndex(r[0]);
    let dst = graph.addOrGetNodeIndex(r[1]);
    graph.addEdges(src, dst, r[2]);
  }

  console.log(`A -> C`, graph.calculateRate("A", "C")); // expect 77/100 ≈ 0.77
  console.log(`B -> A`, graph.calculateRate("B", "A")); // expect 77/100 ≈ 0.77

  graph.printEdges();
}

runAlgForCurrency();
runAlgForDevision();
