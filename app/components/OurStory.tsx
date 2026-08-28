import "./OurStory.css";

const BLOCK_ONE = [
  "POETRY founded in 2020 started with a vision to solve the traditional gaps in residential architecture and execution with a process oriented approach which is more transparent, efficient, easy to monitor and easy to measure for our clients. Founded in 2020 the company has worked on 60 plus designer villas across Bangalore & Goa. Currently the portfolio of projects include not just Villas but also farm houses, plotted developments, boutique commercial and hospitality projects.",
  "Beginning of 2025 the company pivoted its focus on sustainable design & build methods with a more planet conscious approach for families and businesses looking for modern sustainable living spaces. Our focus is more on natural, earthen and locally available materials which blends in with the local habitat thereby, reducing the carbon footprint of our structures. With the world realizing the need of more sustainable ways of living a home becomes the start of such practices therefore, Poetry’s designer sustainable villas pave way for such planet conscious families helping them contribute more towards mother Earth.",
];

const BLOCK_TWO = [
  "Poetry’s villas are not only beautifully designed but also robust in quality, functional and thoughtfully planned keeping practical functionality in mind. Each of our designer villas are personalized in such ways that it represents our client’s personality bringing together their culture, lifestyle and aspirations making every offering exclusive, unique and bespoke. Since our inception in 2020 we have designed and built designer villas for families from various parts of India exhibiting our deep understanding of various cultures of Indian states, their lifestyles, way of living etc. Often times its our clients’ unique requirements that shapes our creativity to draw their bespoke designer villas prompting us to make a poetry out of each home we make. We are constantly and consistently learning ways to bring back traditional Indian sustainable construction practices from across the country like the oxide flooring from Kerala, Athangudi tiles from Tamil Nadu, stone architecture of Karnataka, marble works of Rajasthan, premium artistic wooden doors of Gujarat and many more as we work towards bringing the lost Indian architecture back to life in a modern sustainable ways.",
  "Founded by Praveen Nair, who is a seasoned real estate professional and comes with over a decade and half experience advising and helping large real estate players in Bangalore and been part of organizations like JLL and Colliers International advising Real Estate institutions on investment and asset monetization. Along with him our co-founder Prajon Nair, who comes with a decade’s experience in designing extremely highend, luxurious hospitality projects and exclusive residential homes brings in the technical architectural knowledge carving out exemplary yet practically functional designer villas for our classy clients.",
];

const BLOCK_THREE = [
  "As of today Poetry is active across the most prominent development corridors of Bengaluru district in-terms of execution. We have been active in premium plotted developments of Prestige, Featherlite, Tattvam, ICON, Mahaveer, Goyal & Co. etc. Additionally, we have been active in Southern Goa planning and building luxury European Villas for elite clients aspiring to own a piece of tranquil in the coastal paradise of western India.",
  "With our expansion into the farm house development market, Poetry has been actively seeking farm plot owners wishing to design a farmhouse which will be timeless, sustainable, traditional and durable helping them elevate their lifestyle. Our flagship project in the designer farmhouse category located in Kanakapura has recently been commissioned and work has begun at the site as on August 2026. You may find more details on this in the projects section.",
];

function StoryBlock({
  title,
  paragraphs,
  imageSrc,
  imageAlt,
  imageSide,
}: {
  title?: string;
  paragraphs: string[];
  imageSrc: string;
  imageAlt: string;
  imageSide: "left" | "right";
}) {
  return (
    <div className={`story-block story-block--image-${imageSide}`}>
      <div className="story-block__copy">
        {title ? <h1 className="story-block__title">{title}</h1> : null}
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="story-block__img" src={imageSrc} alt={imageAlt} />
    </div>
  );
}

export default function OurStory() {
  return (
    <section className="our-story" id="about">
      <StoryBlock
        title="Our Story"
        imageSide="right"
        imageSrc="/IMG_0982.jpg"
        imageAlt="Poetry villa at dusk"
        paragraphs={BLOCK_ONE}
      />
      <StoryBlock
        imageSide="left"
        imageSrc="/IMG_0543.jpg"
        imageAlt="Poetry team on site"
        paragraphs={BLOCK_TWO}
      />

      <div className="our-story__band our-story__band--image-right">
        <div className="our-story__panel">
          {BLOCK_THREE.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
          <p>
            <strong>VISION:</strong> Poetry Designs has the vision to be the leading designer villa design &amp; build company of India making bespoke architecture accessible to every plot owner in the markets we operate.
          </p>
          <p>
            <strong>MISSION:</strong> Poetry is constantly working towards bridging the gap between bespoke sustainable designs and seamless execution for our selected elite clients bringing in more transparency and trust.
          </p>
        </div>
        <div className="our-story__graphic">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/wooden-location.png" alt="Poetry Designs locations across Bangalore" />
        </div>
      </div>
    </section>
  );
}
