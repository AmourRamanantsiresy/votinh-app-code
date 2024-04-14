'use client'
import Markdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

const markdown = `**Day 1:**\n\n* **Morning:**\n    * Take the Staten Island Ferry from the Whitehall Terminal in Manhattan to Staten Island. The ferry ride offers stunning views of the Statue of Liberty and the downtown Manhattan skyline.\n    * Explore the Snug Harbor Cultural Center and Botanical Garden on Staten Island.\n* **Afternoon:**\n    * Drive to Washington, DC (approx. 4 hours).\n    * Check into an eco-friendly hotel in Washington, DC, such as the Dupont Circle Hotel or the Kimpton George Hotel.\n* **Evening:**\n    * Visit the National Mall and explore the Smithsonian museums.\n\n**Day 2:**\n\n* **Morning:**\n    * Take a guided tour of the White House and learn about its history and sustainability initiatives.\n* **Afternoon:**\n    * Visit the National Museum of Natural History and explore its eco-friendly exhibits.\n    * Take a stroll through Rock Creek Park, a lush urban refuge.\n* **Evening:**\n    * Dine at a sustainable restaurant, such as The Green Zone or Rasika West End.\n\n**Day 3:**\n\n* **Morning:**\n    * Visit the United States Botanic Garden, a showcase of plant diversity and sustainable gardening practices.\n    * Take a train back to New York City (approx. 3 hours).\n* **Afternoon:**\n    * Visit Central Park and experience its vibrant greenery and sustainability efforts.\n\n**Eco-friendly Transportation:**\n\n* Use public transportation (ferry, train) or carpool within each city.\n* Rent a hybrid or electric car for the drive between New York City and Washington, DC.\n\n**Eco-friendly Accommodation:**\n\n* Choose hotels with LEED certification or other sustainable practices.\n* Opt for rooms with natural light and low-energy lighting.\n\n**Sustainable Dining:**\n\n* Support restaurants that focus on local, seasonal ingredients and minimize food waste.\n* Consider vegetarian or plant-based meals.`

const Page = () => {
  return (
    <div>
      <Markdown>{markdown}</Markdown>
    </div>
  );
};

export default Page;
