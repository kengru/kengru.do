/* 
  Description:
    example wrapper for p5js, containing nature components.
*/

import React, { Component } from "react";
import { withRouter } from "react-router";
import { Title } from "rbx";
import "rbx/index.css";

import "../sketch.css";

class P5Wrapper extends Component {
  render() {
    return (
      <div className="FullDiv">
        <Title size="2" align="center">
          First steps, literally
        </Title>
        <p>
          Let’s give our creature a shape and a name (one day we will refine
          it’s shape, colors and form). Let’s call it Robinson.
          <br />
          <br />
          <img
            src={`${process.env.PUBLIC_URL}/images/rob1.png`}
            alt="Robinson"
          />
          <br />
          <br />
          Robinson doesn’t have any purpose, in fact, he doesn’t even know how
          to move, but we have some choices for him.
        </p>
        <br />
        <p>
          Say we wanted to represent the movement of Robinson. Animals from our
          perspective may take random steps, but their steps tend to be related
          to a step they took before. That means that if they were running left,
          the next step they will take is more likely to be left than right,
          since it’s trying to go somewhere.
        </p>
        <br />
        <p>
          That’s where{" "}
          <a
            style={{ color: "cadetblue" }}
            href="https://en.wikipedia.org/wiki/Perlin_noise"
            target="_blank"
            rel="noopener noreferrer"
          >
            Perlin Noise
          </a>{" "}
          comes in. Instead of giving Robinson random unrelated numbers to move,
          e.g. -2 then 4 then -3, we use the Perlin noise algorithm to receive
          random outputs related to the outputs given before. Here is an
          example:
        </p>
        <br />
        <br />
        <img
          src={`${process.env.PUBLIC_URL}/images/perlinComp.gif`}
          alt="pelinComparition"
        />
        <br />
        <br />
        <p>
          To really appreciate the difference between randomness and noise we
          invite Robinson’s evil twin:
        </p>
        <br />
        <br />
        <img
          src={`${process.env.PUBLIC_URL}/images/perlinBroComp.gif`}
          alt="pelinComparition"
        />
        <br />
        <br />
        <p>
          As you can see, moving a creature by just adding random values makes
          for an unnatural way of moving. <br /> Perlin Noise is used in a wide
          variety of cases, for example, we could create some 2D fog-like image
          by changing the brightness of each pixel to a brightness close to it’s
          neighbor pixel:
        </p>
        <br />
        <br />
        <img
          src={`${process.env.PUBLIC_URL}/images/perlinFog.gif`}
          alt="pelinComparition"
        />
        <br />
        <br />
        <p>
          Or create random 3D terrain by mapping the z value (the height of the
          ground) to a noise value.
        </p>
        <br />
        <br />
        <img
          src={`${process.env.PUBLIC_URL}/images/terrainGen.gif`}
          alt="pelinComparition"
        />
        <br />
        <br />
        <p>
          This is still no fun since first, Robinson’s movement it’s still not
          as organic as what it should represent, second, it does not have any
          interaction or awareness of his environment (you could say that about
          a bunch of humans too) and third, it should have any type of
          discernible behavior. But we will make it happen.
          <br />
          This was just a brief introduction to what we want to eventually
          build. First we will start fixing Robinson’s movement in the next post
          of the series: Vectors!
        </p>
      </div>
    );
  }
}

export default withRouter(P5Wrapper);
