import { useEffect, useRef } from "react";
import neo4j from "neo4j-driver";
import * as d3 from "d3";

const NonCoreElement = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const uri = process.env.REACT_APP_NEO4J_URI;
    const username = process.env.REACT_APP_NEO4J_USERNAME;
    const password = process.env.REACT_APP_NEO4J_PASSWORD;

    const driver = neo4j.driver(uri, neo4j.auth.basic(username, password), {
      encrypted: true,
    });
    const session = driver.session({ database: "neo4j" });

    session
      .run("MATCH (n:Scene) RETURN n LIMIT 25;")
      .then(result => {
        const graph = {
          nodes: [],
          links: [],
        };

        result.records.forEach(record => {
          const node = record.get("n");

          const nodeId = node.identity.toString();
          const nodeName =
            node.properties.name || node.properties.scene_name || "";

          graph.nodes.push({
            id: nodeId,
            label: "Scene",
            name: nodeName,
          });
        });

        renderGraph(graph);
      })
      .catch(error => {
        console.error("Query execution failed: ", error);
      });

    return () => {
      session.close();
      driver.close();
    };
  }, []);

  const renderGraph = graph => {
    const width = 1500;
    const height = 600;
    const nodeRadius = 16;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const simulation = d3
      .forceSimulation(graph.nodes)
      .force(
        "link",
        d3.forceLink().id(d => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-25))
      .force("center", d3.forceCenter(width / 2, height / 2));

    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 50)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#999");

    const link = svg
      .append("g")
      .selectAll("line")
      .data(graph.links)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(graph.nodes)
      .enter()
      .append("circle")
      .attr("r", nodeRadius)
      .attr("fill", "#2CA02C")
      .call(
        d3
          .drag()
          .on("start", dragStarted)
          .on("drag", dragged)
          .on("end", dragEnded)
      );

    const nodeName = svg
      .selectAll("text")
      .data(graph.nodes)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "12px")
      .text(d => d.name);

    node.append("title").text(d => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("cx", d => d.x).attr("cy", d => d.y);
      nodeName.attr("x", d => d.x).attr("y", d => d.y - nodeRadius - 5);
    });

    function dragStarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnded(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  };

  return <svg ref={svgRef}></svg>;
};

export default NonCoreElement;
