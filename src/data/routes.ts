export interface Stop {
  id: string;
  number: number;
  name: string;
  lat: number;
  lng: number;
  shortDesc: string;
  commentary: string;
  tip: string;
  tags: string[];
  walkTimeToNext: number | null;
}

export interface Route {
  id: string;
  number: number;
  title: string;
  tagline: string;
  color: string;
  colorName: string;
  duration: string;
  distance: string;
  budget: string;
  tags: string[];
  stops: Stop[];
}

export interface BonusItem {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: string;
  commentary: string;
  tip: string;
}

export const routes: Route[] = [
  {
    id: "brooklyn-bridge",
    number: 1,
    title: "Brooklyn Bridge",
    tagline:
      "Start with a bagel. End with a view. Cross the bridge before the crowds hit.",
    color: "#FF6319",
    colorName: "orange",
    duration: "~3 hrs",
    distance: "4.2 mi",
    budget: "$$",
    tags: ["food", "views", "iconic", "morning"],
    stops: [
      {
        id: "la-bagel-delight",
        number: 1,
        name: "La Bagel Delight",
        lat: 40.7024,
        lng: -73.9887,
        shortDesc:
          "Grab a bacon egg and cheese on an everything bagel. Don't eat it yet — take it to Pebble Beach.",
        commentary: `Okay so here's the move. You walk into La Bagel Delight first thing in the morning and you order a bacon egg and cheese on an everything bagel. That's it. Don't overthink it, don't get cute with a croissant or some avocado situation. Bacon. Egg. Cheese. Everything bagel. This is the canonical New York breakfast and it costs like five bucks.

Now here's the important part — do NOT eat it yet. I know it smells incredible and the foil is warm in your hands and everything in your body is telling you to tear into it right there on the sidewalk. Resist. You are going to carry this bagel like a precious artifact down to Pebble Beach, which is about a seven-minute walk, and you are going to eat it there with the entire Manhattan skyline in front of you. Trust me on this. The payoff is worth the wait.

This neighborhood is DUMBO — Down Under the Manhattan Bridge Overpass — and it's one of the best areas in Brooklyn. Used to be all warehouses and artists, now it's bougie as hell but still beautiful. The cobblestone streets are real and the light in the morning is genuinely special.`,
        tip: "Get here before 8:30 AM on weekends. The line gets long. Cash and card both work.",
        tags: ["food"],
        walkTimeToNext: 2,
      },
      {
        id: "dumbo-manhattan-bridge-view",
        number: 2,
        name: "DUMBO Manhattan Bridge View",
        lat: 40.7033,
        lng: -73.9896,
        shortDesc:
          "The iconic Instagram shot — Manhattan Bridge framed between brick warehouses on Washington Street.",
        commentary: `This is THE photo spot. You've seen it a thousand times on Instagram — the Manhattan Bridge perfectly framed between two brick warehouse buildings on Washington Street. And yeah, it really does look like that in real life. It's one of those rare cases where the photo actually matches reality.

Get here early though, I'm serious. By 10 AM on any decent weather day this intersection is basically a photo studio with 40 people jockeying for position. If you're here at 8 AM you'll have the street mostly to yourself and the light is way better anyway. Morning light hits the bridge from the east and it just glows.

Stand in the middle of Washington Street (watch for cars, obviously) and shoot looking north. The Empire State Building peeks through the bridge cables if you position yourself right. Pro move: take the photo, admire it for a sec, then keep moving. Don't be the person who spends 30 minutes here blocking everyone else.`,
        tip: "Morning light is best. Stand on Washington Street looking north. Get the shot and keep moving — Pebble Beach awaits with your bagel.",
        tags: ["views", "photo-op"],
        walkTimeToNext: 3,
      },
      {
        id: "pebble-beach",
        number: 3,
        name: "Pebble Beach",
        lat: 40.7044,
        lng: -73.9906,
        shortDesc:
          "A tiny rocky beach under the bridges. Eat your bagel here with the Manhattan skyline in front of you.",
        commentary: `Alright, this is the moment. You've been carrying that bagel for like ten minutes and now you're standing on a little rocky beach on the East River with the Brooklyn Bridge to your right, the Manhattan Bridge to your left, and the entire lower Manhattan skyline directly across the water. Unwrap that bagel. Take a bite. Welcome to New York.

I'm not being dramatic — this is genuinely one of my favorite spots in the entire city. It's called Pebble Beach (yes, like the golf course, no relation) and it's just this small stretch of rocky shoreline that most tourists walk right past. The rocks are uneven so find a good sitting spot, but dude, the view. The Freedom Tower, the Woolworth Building, the South Street Seaport — it's all right there.

There's something almost spiritual about eating a fresh New York bagel on the water's edge with this view at 8 in the morning. The city is just waking up, the ferries are starting to run, and you've got this little moment of peace before the day goes full speed. This is the kind of thing you can't get from a tour bus.`,
        tip: "The rocks are uneven — wear shoes with grip. If the bagel is gone and you want coffee, there's a Blue Bottle nearby on Water Street.",
        tags: ["views", "food-spot"],
        walkTimeToNext: 5,
      },
      {
        id: "janes-carousel",
        number: 4,
        name: "Jane's Carousel",
        lat: 40.7045,
        lng: -73.9924,
        shortDesc:
          "A beautifully restored 1922 carousel inside a glass pavilion by Jean Nouvel, right on the waterfront.",
        commentary: `This is Jane's Carousel and it's housed inside this stunning transparent glass pavilion designed by Jean Nouvel. It's a fully restored 1922 carousel that was originally in Youngstown, Ohio, and an artist named Jane Walentas spent like 20 years restoring every single horse by hand. The level of craftsmanship is insane — each horse is hand-painted and they all have unique expressions.

Even if you don't ride it (it's like $2 if you do, and honestly why not), the pavilion itself is worth seeing. At night the whole thing lights up and it looks like a glowing jewel box on the waterfront. During the day you get these incredible reflections of the Manhattan skyline in the glass walls.

While you're in this area, wander around the old warehouse buildings. DUMBO has some great street art and a bunch of small shops and galleries tucked into the ground floors. The Empire Stores building nearby has been converted into a really nice retail and food space — it's worth poking around if you have time.`,
        tip: "The carousel runs year-round but hours vary — check ahead. It's $2 a ride. The glass pavilion is gorgeous for photos even when the carousel is closed.",
        tags: ["landmark", "explore"],
        walkTimeToNext: 8,
      },
      {
        id: "brooklyn-bridge-lookout",
        number: 5,
        name: "Brooklyn Bridge Lookout",
        lat: 40.7035,
        lng: -73.9953,
        shortDesc:
          "An alcove under the bridge approach with killer views, plus Shake Shack and a weekend flea market.",
        commentary: `There's this spot right under the Brooklyn Bridge approach — kind of a stone alcove area — where you get an incredible perspective looking up at the bridge architecture and out across the river. Most people just walk over the bridge and miss this entirely, but the views from underneath are honestly just as good in their own way. You can really appreciate the massive scale of the stone towers from here.

Right nearby is a Shake Shack, which, look, I know it's a chain, but the original Brooklyn location still hits different. If you didn't do the bagel thing or you're hungry again (walking does that), grab a burger. There's also a weekend flea market in this area — Brooklyn Flea sometimes sets up near here and it's legit. Vintage stuff, local art, food vendors, the whole deal.

The area around the bridge on the Brooklyn side has been really well developed. There are nice walkways, benches, and gardens. It's a good spot to take a breather before you start the walk along the waterfront toward Brooklyn Heights.`,
        tip: "Check if Brooklyn Flea is running (weekends, weather permitting). The Shake Shack line can be brutal on weekends — go early or skip it.",
        tags: ["views", "food"],
        walkTimeToNext: 5,
      },
      {
        id: "granite-prospect",
        number: 6,
        name: "The Granite Prospect",
        lat: 40.702,
        lng: -73.9974,
        shortDesc:
          "A wide granite overlook in Brooklyn Bridge Park with panoramic harbor views and the Statue of Liberty in the distance.",
        commentary: `The Granite Prospect is this wide, tiered granite overlook that juts out into the harbor from Brooklyn Bridge Park. It's basically a giant set of stone steps that faces the water and gives you these panoramic views of the harbor, Governor's Island, and if you look south you can see the Statue of Liberty way out there. On a clear day it's incredible.

This is one of those spots where New Yorkers actually come to hang out — not just tourists. On summer evenings people bring wine and picnics and sit on the granite steps and watch the sunset behind the Statue of Liberty. It's genuinely beautiful and it's free. The park designers really nailed this section.

From here you can connect to the Squibb Park Bridge, which is this cool bouncy wooden bridge that takes you up from the waterfront level to the bluff where Brooklyn Heights sits. It's a relatively new addition and it's a fun little architectural moment. The bridge actually has a slight bounce to it when you walk — it's not a malfunction, it's intentional, and it's kind of delightful.`,
        tip: "Face south for Statue of Liberty views. This is a great sunset spot if you're doing this route in the evening instead of morning.",
        tags: ["views", "walking"],
        walkTimeToNext: 5,
      },
      {
        id: "squibb-park-bridge",
        number: 7,
        name: "Squibb Park Bridge & Elevated Viewpoint",
        lat: 40.7009,
        lng: -73.996,
        shortDesc:
          "A unique wooden pedestrian bridge that bounces as you walk, connecting the waterfront to the Heights with great city views.",
        commentary: `Okay this bridge is fun. The Squibb Park Bridge is a wooden pedestrian bridge that connects the waterfront level of Brooklyn Bridge Park up to the bluff where Squibb Park and Brooklyn Heights sit. And it literally bounces when you walk on it. Like, noticeably. The first time I walked on it I thought something was wrong but no — the architect designed it with a flexible timber structure that gives it this springy quality. Kids absolutely love it.

The bridge was actually rebuilt a few years back because the original version bounced TOO much and they had to close it for safety reasons. The new version still has that bouncy character but it's more controlled. Engineering, man.

From the elevated section you get really nice views back toward Manhattan and the Brooklyn Bridge. It's a different perspective than what you've been seeing at water level — now you're up high looking across and you can see how the bridge connects the two boroughs. Take a minute here to appreciate the view before you head into Brooklyn Heights, which is one of the most beautiful residential neighborhoods in all of New York.`,
        tip: "The bridge can be closed in bad weather. If it's closed, take the stairs at Everit Street up to Columbia Heights instead — same destination, fewer views.",
        tags: ["views"],
        walkTimeToNext: 5,
      },
      {
        id: "brooklyn-heights-promenade",
        number: 8,
        name: "Brooklyn Heights Promenade",
        lat: 40.6964,
        lng: -73.9977,
        shortDesc:
          "The famous promenade with unobstructed Manhattan skyline views, lined by some of the most expensive brownstones in Brooklyn.",
        commentary: `The Brooklyn Heights Promenade is one of the most famous walkways in New York and when you get here you'll immediately understand why. It's a wide, paved promenade that runs along the edge of the bluff overlooking the Brooklyn-Queens Expressway (which is hidden below you) with completely unobstructed views of lower Manhattan, the Brooklyn Bridge, and the harbor. It's stunning.

The brownstones and townhouses along the promenade are some of the most expensive real estate in Brooklyn — we're talking $5-15 million homes just casually sitting there. Brooklyn Heights was actually the first designated historic district in New York City, so everything is beautifully preserved. The tree-lined streets, the stoops, the detailed facades — it's like a movie set except people actually live here. Very fancy people.

After you've walked the promenade and taken approximately 400 photos, here's what I'd suggest: if you haven't crossed the Brooklyn Bridge yet, now's a great time to do it. Walk back toward the bridge and cross over to Manhattan on the pedestrian path. The walk takes about 30-40 minutes and the views are incredible from up on the bridge. Just stay in the pedestrian lane — the bike lane is separate and cyclists will absolutely yell at you if you wander into it. Trust me on this one.`,
        tip: "Walk the full length of the promenade — it's about a third of a mile. If you're crossing the Brooklyn Bridge after, enter from the Tillary Street entrance on the Brooklyn side.",
        tags: ["views", "iconic"],
        walkTimeToNext: null,
      },
    ],
  },
  {
    id: "world-trade-center",
    number: 2,
    title: "World Trade Center",
    tagline:
      "From the Oculus to the Esplanade. A walk through remembrance and rebirth.",
    color: "#5B8DEF",
    colorName: "blue",
    duration: "~2.5 hrs",
    distance: "2.1 mi",
    budget: "$$$",
    tags: ["history", "architecture", "walking", "views"],
    stops: [
      {
        id: "the-oculus",
        number: 1,
        name: "The Oculus",
        lat: 40.7113,
        lng: -74.0111,
        shortDesc:
          "Santiago Calatrava's massive white transportation hub — a cathedral of light and steel that literally takes your breath away.",
        commentary: `The Oculus is one of those buildings that makes you stop in your tracks. Designed by Santiago Calatrava, it's the World Trade Center transportation hub and it looks like a giant white bird about to take flight. Or a ribcage. Or dinosaur bones. Everyone sees something different, and every interpretation is valid because this thing is genuinely jaw-dropping.

Walk inside and just look up. The interior is this soaring white space with massive steel ribs arching overhead, and there's a skylight that runs the entire length of the spine. On September 11th each year, the skylight is opened so that sunlight falls in a specific pattern to mark the moment. The engineering and symbolism are both incredible. Say whatever you want about the $4 billion price tag — and people have said plenty — but standing inside this space is an awe-inspiring experience.

It's also a functioning transit hub (PATH trains to New Jersey) and a shopping mall (Westfield). The stores are high-end — your Diors and your Apple Stores — but you're not here to shop. You're here to experience the architecture. Walk slowly, look up, and give yourself a few minutes to just absorb the space. It's unlike anything else in the city.`,
        tip: "Enter from the street level on Church Street for the most dramatic reveal. The interior is best photographed in the morning when sunlight streams through the skylight.",
        tags: ["architecture", "landmark"],
        walkTimeToNext: 5,
      },
      {
        id: "ground-zero-memorial",
        number: 2,
        name: "Ground Zero Memorial & Museum",
        lat: 40.7116,
        lng: -74.0132,
        shortDesc:
          "The twin reflecting pools mark where the towers stood. The underground museum is one of the most powerful experiences in the city.",
        commentary: `I'm not going to tell you how to feel here. The 9/11 Memorial is two enormous square reflecting pools set in the exact footprints of the original Twin Towers, with water cascading down the sides into a void at the center. The names of every person who died are inscribed in bronze around the edges. It's solemn and beautiful and heavy all at once.

Take your time walking around both pools. Read some of the names. Notice how the water sounds — it's designed to create this constant rushing noise that blocks out the city and creates a sense of quiet even though you're standing in one of the busiest parts of Manhattan. The design by Michael Arad and Peter Walker is masterful. The surrounding plaza has over 400 oak trees and there's one specific tree — the Survivor Tree — that was pulled from the rubble and nursed back to health. It's marked with a plaque.

The underground museum is a separate experience and it requires tickets — get them online in advance because they do sell out. I'll be honest: the museum is emotionally devastating. The artifacts, the audio recordings, the personal items — it's a lot. But it's also one of the most important and well-done museums I've ever been to. Plan at least 90 minutes and be prepared to be moved.`,
        tip: "Book museum tickets online at least a day ahead — they sell out. Tuesday evenings after 5 PM are free but crowded. The memorial plaza itself is always free.",
        tags: ["history", "museum"],
        walkTimeToNext: 5,
      },
      {
        id: "brookfield-place",
        number: 3,
        name: "Brookfield Place & Winter Garden",
        lat: 40.7131,
        lng: -74.0154,
        shortDesc:
          "A spectacular glass atrium with 40-foot palm trees, marble floors, and a high-end food hall — an unexpected oasis in the Financial District.",
        commentary: `After the emotional weight of the Memorial, Brookfield Place is a nice change of pace. The Winter Garden Atrium is this massive glass-and-steel space filled with 40-foot palm trees — actual living palm trees, in lower Manhattan, which is kind of wild when you think about it. The marble floors gleam, the light pours in through the vaulted glass ceiling, and it feels like you've stepped into some kind of botanical cathedral.

The Winter Garden was actually severely damaged on 9/11 and was painstakingly restored. It reopened in 2002 and has been a symbol of the area's recovery. They host free concerts and art installations here regularly — check what's on because sometimes you luck into something really cool.

There's also Le District on the ground floor, which is a French-inspired food hall and market. It's not cheap, but the quality is excellent. If you want a sit-down lunch, the restaurants overlooking the marina are a solid choice. Or just grab a pastry and a coffee from one of the market stalls and eat it in the atrium while you people-watch. This area is mostly finance bros during the week and tourists on weekends — very different vibes.`,
        tip: "Le District's market area is more affordable than the sit-down restaurants. Check the events calendar — the Winter Garden hosts free concerts regularly.",
        tags: ["architecture"],
        walkTimeToNext: 3,
      },
      {
        id: "belvedere-plaza",
        number: 4,
        name: "Belvedere Plaza & Harbor",
        lat: 40.7139,
        lng: -74.0172,
        shortDesc:
          "Step outside to the waterfront with views of the Hudson, Jersey City, and the start of the Hudson River Esplanade.",
        commentary: `Step outside Brookfield Place onto the waterfront and you're on the Belvedere Plaza, which is basically a beautiful terrace overlooking the North Cove Marina. There are usually some sailboats and yachts docked here, and across the Hudson you can see Jersey City's skyline. It's a surprisingly peaceful spot given that you're standing in the heart of the Financial District.

This is also the starting point of the Hudson River Esplanade, which is one of the best-kept secrets in Manhattan. It's a continuous waterfront path that runs all the way up the west side of Manhattan — like, for miles. You could technically walk from here to the High Line and beyond without ever leaving the waterfront. We're not going to do that today, but it's good to know it exists.

The plaza often has public art installations and during warmer months there are outdoor restaurants with marina views. It's a great spot to sit on a bench and just watch the boats and the water for a few minutes. After the intensity of Ground Zero and the grandeur of the Oculus, sometimes you just need to sit by the water and breathe.`,
        tip: "The Esplanade heading north is a beautiful walk if you want to extend this route. In summer, look for outdoor dining at PJ Clarke's on the marina.",
        tags: ["views", "walking"],
        walkTimeToNext: 10,
      },
      {
        id: "tom-otterness-sculptures",
        number: 5,
        name: "Tom Otterness Sculptures",
        lat: 40.7181,
        lng: -74.0154,
        shortDesc:
          "Dozens of whimsical little bronze sculptures hidden throughout the waterfront — a treasure hunt disguised as public art.",
        commentary: `Okay this is one of my favorite hidden gems in all of NYC. Tom Otterness is an artist who created this installation called "The Real World" along the waterfront in Battery Park City, and it consists of dozens of small bronze figures scattered everywhere — on benches, under railings, on top of bollards, peeking around corners. They're these chubby little cartoon-like characters doing various things, and many of them are satirical commentaries on money and capitalism, which is perfect given the location.

There's a little guy carrying a huge bag of money, figures sawing pennies in half, characters riding alligators that are coming out of manholes — they're everywhere and finding them is like a treasure hunt. Kids go absolutely nuts for these things, but honestly adults love them too. I've been here probably ten times and I still find ones I haven't noticed before.

The detail and humor in each piece is incredible. Otterness has a real knack for making art that's accessible and fun without being dumbed down. It's commentary, but it's also just delightful. Walk slowly through the area, look at every surface, every railing, every bench. The sculptures are small — maybe 6 to 18 inches — so you really have to pay attention. That's kind of the point.`,
        tip: "Look everywhere — on, under, and around every surface. There are dozens scattered across a wide area. The kids will find them faster than you.",
        tags: ["art", "walking"],
        walkTimeToNext: null,
      },
    ],
  },
  {
    id: "financial-district",
    number: 3,
    title: "Financial District",
    tagline:
      "Wall Street, old New York, and the best free ferry ride in the city.",
    color: "#2ECC71",
    colorName: "green",
    duration: "~2 hrs",
    distance: "1.8 mi",
    budget: "$",
    tags: ["history", "free", "walking", "views"],
    stops: [
      {
        id: "wall-street-nyse",
        number: 1,
        name: "Wall Street & NYSE",
        lat: 40.7069,
        lng: -74.0089,
        shortDesc:
          "The most famous financial street in the world. Named after an actual Dutch wall. The NYSE facade is iconic.",
        commentary: `Wall Street. The name alone conjures up images of power suits and stock tickers and Leonardo DiCaprio throwing money around. The actual street is surprisingly narrow and short — it runs from Broadway to South Street and that's it. But what a street. The New York Stock Exchange is right here on the corner of Broad Street with its massive neoclassical facade and the giant American flag, and Federal Hall is directly across the street where George Washington was inaugurated as the first president.

Fun history: the street is literally named after a wall. The Dutch colonists built a wooden wall across this area in the 1650s to protect their settlement of New Amsterdam from the British. The wall came down, the name stuck, and now it's shorthand for global capitalism. History is weird like that.

You can't go inside the NYSE (it's been closed to public visitors since 9/11), but the exterior is worth seeing, and Federal Hall is free to enter and has some cool exhibits about the founding of the nation. The statue of George Washington out front is on the exact spot where he took the oath of office in 1789. Stand there for a second and think about that. This little street corner is where America as a country basically started.`,
        tip: "Federal Hall is free to enter and has clean bathrooms — rare in this part of the city. The Washington statue is a great photo op.",
        tags: ["history", "landmark"],
        walkTimeToNext: 5,
      },
      {
        id: "delmonicos",
        number: 2,
        name: "Delmonico's",
        lat: 40.7052,
        lng: -74.0103,
        shortDesc:
          "America's first fine dining restaurant, open since 1837. A Gilded Age landmark that invented Eggs Benedict and Baked Alaska.",
        commentary: `Delmonico's has been here since 1837. Let that sink in. This restaurant was serving steak to New York's elite before the Civil War, before electricity, before basically everything we think of as modern New York existed. It's credited with inventing Eggs Benedict, Baked Alaska, and the Delmonico steak (which is a ribeye, and yes, it's damn good).

The building itself is a gorgeous triangular structure on the corner of Beaver and William Streets. The interior is all dark wood and white tablecloths and it feels like stepping back into the Gilded Age. J.P. Morgan, Teddy Roosevelt, Mark Twain, Charles Dickens — they all ate here. The place has been through fires, Prohibition, the Depression, and it's still standing. That's resilience.

Now, eating here is not cheap. This is a proper steakhouse and dinner will run you a solid $80-150 per person depending on what you order. But if it's in your budget, the experience is worth it at least once. The Delmonico steak is the move, obviously. If a full dinner isn't in the cards, just walk past and appreciate the history. There's a plaque on the building that tells the whole story.`,
        tip: "Lunch is more affordable than dinner. If you just want to peek inside, the staff is usually cool about it — just be respectful. Reservations recommended for dinner.",
        tags: ["food", "history"],
        walkTimeToNext: 8,
      },
      {
        id: "bowling-green",
        number: 3,
        name: "Bowling Green",
        lat: 40.7041,
        lng: -74.0135,
        shortDesc:
          "NYC's oldest public park — a tiny green triangle with the famous Charging Bull sculpture just north of it.",
        commentary: `Bowling Green is the oldest public park in New York City, dating back to 1733. It's tiny — literally a small triangle of green space — but it's packed with history. This was originally a Dutch cattle market, then the British turned it into a bowling green (hence the name), and during the Revolution, an angry mob tore down a statue of King George III that stood here and melted it into musket balls. Absolutely savage move.

The big draw here now is the Charging Bull sculpture by Arturo Di Modica, which sits on Broadway just north of the park. You've seen it in a thousand photos — it's that massive bronze bull that's become the symbol of Wall Street optimism. The sculptor actually installed it illegally in 1989 as a guerrilla art piece in front of the NYSE, and it was so popular that the city let it stay (they just moved it to this location). It's about 11 feet tall and weighs over 7,000 pounds.

Fair warning: the bull is a tourist magnet and there's almost always a crowd of people posing with it. If you want a photo without 20 strangers in it, come early morning or late evening. Also, people touch the bull's nose and horns for good luck, and certain other parts for... other kinds of luck. I'll leave that to your imagination.`,
        tip: "The Fearless Girl statue has been moved to in front of the NYSE on Broad Street — check there if you want to see her too. The bull is best photographed early morning with no crowds.",
        tags: ["history", "landmark"],
        walkTimeToNext: 5,
      },
      {
        id: "battery-park",
        number: 4,
        name: "Battery Park & Castle Clinton",
        lat: 40.7033,
        lng: -74.017,
        shortDesc:
          "A waterfront park at Manhattan's southern tip with Statue of Liberty views and the historic Castle Clinton fort.",
        commentary: `Battery Park is at the very southern tip of Manhattan and it's one of my favorite parks in the city. You've got the harbor stretching out in front of you, the Statue of Liberty visible in the distance (she's surprisingly small from here, but she's there), and Governor's Island off to the left. On a clear day this view is absolutely spectacular.

Castle Clinton is this circular sandstone fort sitting in the middle of the park. It was built in 1811 to defend the harbor and it's been a beer garden, an opera house, an immigration station (before Ellis Island), and an aquarium at various points in its life. Now it's a National Monument and the ticket office for the Statue of Liberty and Ellis Island ferries. Even if you're not taking the ferry, walk through the fort — it's free and the walls are thick and cool and it's a nice little pocket of history.

The park itself is really well maintained and has some great public art scattered around, including "The Sphere" by Fritz Koenig, which was originally in the WTC plaza and was damaged on 9/11 but survived. It was moved here as a memorial. There are also nice gardens and a great waterfront promenade where you can watch the ferries come and go.`,
        tip: "If you want to visit the Statue of Liberty, book ferry tickets well in advance at statuecruises.com — they sell out fast, especially pedestal and crown access.",
        tags: ["views", "walking"],
        walkTimeToNext: 5,
      },
      {
        id: "staten-island-ferry",
        number: 5,
        name: "Staten Island Ferry Terminal",
        lat: 40.6433,
        lng: -74.072,
        shortDesc:
          "A completely FREE ferry ride past the Statue of Liberty with incredible harbor views. One of the best deals in NYC.",
        commentary: `Listen to me very carefully: the Staten Island Ferry is FREE. Completely, totally, 100% free. You don't need a ticket, you don't need a MetroCard, you just walk on. And it takes you on a 25-minute ride right past the Statue of Liberty with absolutely stunning views of the Manhattan skyline, the harbor, and the bridges. This is one of the best deals not just in New York but in the entire world.

The ferry runs 24/7, every 30 minutes during peak hours and every hour late at night. The Whitehall Terminal is the starting point on the Manhattan side — it's a big modern terminal right at the bottom of Manhattan, a short walk from Battery Park. Just follow the signs, walk in, and get on the next boat. Stand on the right side of the boat (starboard) for the best Statue of Liberty views on the way out.

Here's a fun piece of history: Cornelius Vanderbilt — yeah, THAT Vanderbilt, one of the richest Americans ever — got his start running a ferry service on this exact route when he was a teenager. That ferry business eventually became the foundation of his entire railroad empire. The free fare wasn't always the case, but the city made it free in 1997 as a public service. When you get to Staten Island, you can just get off and get right back on the next ferry back to Manhattan. Round trip takes about an hour.`,
        tip: "Stand on the right (starboard) side heading to Staten Island for the best Statue of Liberty views. The upper deck outdoor areas have the best views but can be windy.",
        tags: ["free", "views", "iconic"],
        walkTimeToNext: null,
      },
    ],
  },
  {
    id: "village-soho",
    number: 4,
    title: "Village & SoHo",
    tagline:
      "The best deli in America, the best falafel, and streets that never sleep.",
    color: "#EE352E",
    colorName: "red",
    duration: "~4 hrs",
    distance: "3.5 mi",
    budget: "$$$",
    tags: ["food", "shopping", "nightlife", "culture"],
    stops: [
      {
        id: "katzs-delicatessen",
        number: 1,
        name: "Katz's Delicatessen",
        lat: 40.7223,
        lng: -73.9874,
        shortDesc:
          "The most legendary deli in America. Chaotic ordering system. Life-changing pastrami. Don't lose your ticket.",
        commentary: `Katz's Delicatessen has been here since 1888 and it is, without exaggeration, the greatest deli in the United States. Maybe the world. The pastrami sandwich here is a religious experience — hand-carved, piled impossibly high on rye bread with spicy mustard. It's like $25 for a sandwich, which sounds insane until you realize the thing is big enough to feed two people and every single bite is transcendent.

But here's the thing — the ordering system at Katz's is absolute chaos and if you don't know how it works you will be confused and possibly yelled at. Here's how it goes: when you walk in, a person at the door hands you a ticket. DO NOT LOSE THIS TICKET. I cannot stress this enough. If you lose the ticket they charge you a penalty. Take the ticket, go to one of the counter stations, tell the cutter what you want, and they'll carve it right in front of you. They'll usually give you a taste while they're carving — accept it gratefully and tip a buck or two. Then they stamp your ticket. Pay at the register on your way out.

This is also where they filmed the famous "I'll have what she's having" scene from When Harry Met Sally — there's a sign hanging from the ceiling marking the exact table. The walls are covered in celebrity photos going back decades. It's loud, it's crowded, the tables are communal, and it's one of the most quintessentially New York experiences you can have.`,
        tip: "DO NOT LOSE YOUR TICKET. Seriously. Tip the cutter $1-2 when they give you a taste. The pastrami is the move, but the corned beef and the Reuben are also incredible.",
        tags: ["food", "iconic"],
        walkTimeToNext: 15,
      },
      {
        id: "washington-square-park",
        number: 2,
        name: "Washington Square Park",
        lat: 40.7309,
        lng: -73.9973,
        shortDesc:
          "The beating heart of Greenwich Village — chess hustlers, street musicians, NYU students, and the iconic marble arch.",
        commentary: `Washington Square Park is the center of gravity for Greenwich Village and honestly one of the most vibrant public spaces in New York. The big marble arch at the north end was designed by Stanford White in 1892 to commemorate the centennial of George Washington's inauguration, and it's modeled after the Arc de Triomphe in Paris. It's gorgeous and it perfectly frames Fifth Avenue looking north.

The park is alive with energy basically all the time. Chess hustlers set up tables on the southwest corner and they will absolutely destroy you for $5 a game — these guys are genuinely skilled players who've been doing this for decades. Street musicians, NYU students studying on the grass, dog walkers, break dancers, someone shouting about the end of the world — it's all happening simultaneously and it's beautiful.

Greenwich Village has been the center of New York's counterculture since forever — the Beat Generation, the folk music scene (Bob Dylan played his first NYC gigs in clubs right around here), the gay rights movement (Stonewall is a few blocks west), and the artistic community that made New York what it is. Walking through this park, you're walking on hallowed cultural ground. Sit on the edge of the fountain for a few minutes, soak it in, and people-watch. It's free entertainment that's better than most things you'd pay for.`,
        tip: "Play chess with the hustlers if you dare — it's a quintessential NYC experience even if you lose. The park has clean-ish public restrooms on the east side.",
        tags: ["culture", "landmark"],
        walkTimeToNext: 3,
      },
      {
        id: "caffe-reggio",
        number: 3,
        name: "Caffe Reggio",
        lat: 40.7303,
        lng: -74.0004,
        shortDesc:
          "The cafe that claims to have served the first cappuccino in America, operating since 1927 on MacDougal Street.",
        commentary: `Caffe Reggio has been on MacDougal Street since 1927 and they claim to have introduced the cappuccino to America. Whether or not that's literally true (debatable), the place is absolutely dripping with old-world charm. The original espresso machine from the 1920s is still on display — this massive, ornate, copper-and-brass contraption that looks like it belongs in a steampunk museum.

The interior is dark and cozy with oil paintings on the walls, antique furniture, and these little marble-topped tables where you can imagine beatniks scribbling poetry in the 1950s. Because that's exactly what happened here — this was a major hangout for the Beat Generation and later for the folk musicians who made the Village famous. The ghosts of Kerouac and Dylan are practically sitting in the corner booth.

Order a cappuccino (obviously) or an espresso and just sit for a while. The coffee is good — not the best in the city by modern specialty coffee standards, but that's not the point. You're paying for the atmosphere and the history, and on that front it delivers massively. MacDougal Street outside is a whole scene too — restaurants, bars, comedy clubs. It's one of the most happening streets in the Village, especially at night.`,
        tip: "It's cash only. Grab a small table by the window for prime people-watching on MacDougal Street. Don't expect fast service — this is a place to linger.",
        tags: ["food", "culture"],
        walkTimeToNext: 1,
      },
      {
        id: "mamouns-falafel",
        number: 4,
        name: "Mamoun's Falafel",
        lat: 40.7302,
        lng: -74.0004,
        shortDesc:
          "Legendary falafel since 1971. Cheap, fast, and incredibly good. A MacDougal Street institution.",
        commentary: `Mamoun's is literally right next door to Caffe Reggio (or very nearly) and it's been serving falafel on MacDougal Street since 1971. A falafel sandwich here is like $5-6 and it is genuinely one of the best things you can eat in New York at any price point. Crispy on the outside, perfectly seasoned, loaded into a pita with tahini and vegetables. Simple. Perfect.

This place has been a lifeline for broke NYU students, late-night Village wanderers, and falafel enthusiasts for over fifty years. The space is tiny — like, comically small — with just a counter and a few stools. Most people get it to go and eat it while walking, which is honestly the best way to experience it. Hot falafel, cold night, MacDougal Street buzzing around you — that's the Village experience right there.

They also do shawarma, kebabs, and other Middle Eastern staples, and it's all good, but the falafel is the thing. Get the falafel. Maybe get two because the first one disappears fast and you're going to want another one. At these prices, why not? This is the kind of place that makes New York special — unpretentious, delicious, been doing the same thing for decades, and absolutely nailing it every time.`,
        tip: "Get the falafel sandwich. It's cheap enough to get two. Open late — perfect for a post-bar snack if you're in the Village at night.",
        tags: ["food"],
        walkTimeToNext: 5,
      },
      {
        id: "bleecker-street-soho",
        number: 5,
        name: "Bleecker Street & SoHo",
        lat: 40.728,
        lng: -73.999,
        shortDesc:
          "Wander from Bleecker's boutiques through Minetta Lane into SoHo's legendary cast-iron architecture and shopping.",
        commentary: `Bleecker Street is one of the great walking streets in New York. It runs through the heart of the Village and it's lined with boutiques, record shops, restaurants, and some of the most charming architecture in the city. As you walk south and east, you'll pass through some of the most photogenic blocks in Manhattan — tree-lined streets with brownstones, fire escapes, and that unmistakable Village character.

Make a quick detour down Minetta Lane — it's a tiny curved street just off Bleecker that was once the heart of Little Africa, a 19th-century Black neighborhood that's been mostly forgotten. Minetta Tavern is here, which is now a fancy French bistro but has been a bar since 1937. The little lane has incredible atmosphere and it's one of those places most tourists completely miss.

As you continue into SoHo, the architecture shifts dramatically. SoHo is famous for its cast-iron buildings — these incredible facades from the 1850s-1880s that were basically the world's first modular architecture. They were designed to look like stone but they're actually cast iron, and the detail work is extraordinary. Look up as you walk on Broadway, Greene Street, and Mercer Street. The buildings are now home to high-end shops and galleries, but the architecture is the real attraction.`,
        tip: "Look up in SoHo — the cast-iron architecture on Greene Street and Broadway is stunning. Minetta Lane is easy to miss but worth the 2-minute detour.",
        tags: ["shopping", "walking"],
        walkTimeToNext: 8,
      },
      {
        id: "prince-street-pizza",
        number: 6,
        name: "Prince Street Pizza",
        lat: 40.7231,
        lng: -73.9945,
        shortDesc:
          "Home of the famous spicy spring pepperoni square — thick, crispy, covered in spicy pepperoni cups. The line is worth it.",
        commentary: `Prince Street Pizza is famous for exactly one thing: the spicy spring pepperoni square. And dude, it is absolutely worth the hype. It's a thick Sicilian-style square slice topped with these small pepperoni cups that curl up and fill with spicy grease while they cook. The edges are crispy, the dough is pillowy, and every bite has this incredible combination of spice, cheese, and pepperoni. It's not health food. It's transcendence.

The line is usually out the door, especially on weekends, and the wait can be 20-30 minutes. Is it worth it? Yes. Absolutely yes. I've waited in that line probably 15 times and I've never regretted it once. The regular cheese and pepperoni slices are also great, but you're here for the square. Get the square.

One thing to know: this is a tiny shop with basically no seating. You're eating this on the sidewalk, on a bench, walking — wherever. That's fine. New York pizza is street food at its core. Fold it (you fold regular slices, not squares), find a stoop, sit down, and enjoy. You're in SoHo, surrounded by beautiful buildings and well-dressed people, eating one of the best slices in the city. Life is good.`,
        tip: "The spicy spring pepperoni square is the move — don't overthink it. The line moves faster than it looks. Weekday lunch is less crowded than weekends.",
        tags: ["food"],
        walkTimeToNext: 12,
      },
      {
        id: "st-marks-place",
        number: 7,
        name: "St. Mark's Place",
        lat: 40.7286,
        lng: -73.9895,
        shortDesc:
          "The former punk and counterculture strip of the East Village. Tamer now, but still full of character and great late-night spots.",
        commentary: `St. Mark's Place is technically just one block of East 8th Street between Third Avenue and Avenue A, but it's one of the most culturally significant blocks in the city. This was the epicenter of New York's punk scene in the 1970s and 80s — CBGB was nearby, the Ramones hung out here, Andy Warhol lived just off this street, and the entire East Village counterculture bubbled up from these few blocks.

Is it still that edgy? Honestly, no. The punk clubs are mostly gone, replaced by ramen shops, bubble tea places, and trendy bars. But the spirit is still there if you know where to look. The street-level shops still have that independent, slightly weird energy — vintage clothing, record stores, tattoo parlors, head shops. It's more East Village hipster than East Village punk now, but it's still decidedly not corporate.

Walk the length of it and soak in the energy, especially in the evening when the street comes alive. The bars and restaurants on and around St. Mark's are excellent — everything from cheap dumplings to craft cocktails. The East Village in general is one of the best neighborhoods in New York for food and nightlife, and St. Mark's is the main artery.`,
        tip: "Come back at night for the full experience — St. Mark's is best after dark. The Japanese restaurants and bars in this area are particularly good.",
        tags: ["culture", "nightlife"],
        walkTimeToNext: 3,
      },
      {
        id: "kenka",
        number: 8,
        name: "KENKA",
        lat: 40.7291,
        lng: -73.9885,
        shortDesc:
          "A surreal, chaotic, cheap-as-hell Japanese izakaya covered in bizarre decorations. The food is surprisingly legit.",
        commentary: `KENKA is an experience. It's a Japanese izakaya on St. Mark's Place that looks like a fever dream — the entire restaurant is covered floor-to-ceiling with random Japanese memorabilia, neon signs, mannequin parts, paper lanterns, posters, toys, and just... stuff. It's sensory overload in the best possible way. You walk in and your brain just short-circuits trying to process the visual chaos.

And then the food comes and it's actually really good. Like, surprisingly good for a place that looks like a Japanese flea market exploded inside a restaurant. The takoyaki (octopus balls) are crispy and perfect, the fried chicken is outstanding, and most of the small plates are in the $5-10 range, which is almost unheard of in Manhattan. You can eat a full meal with drinks for like $20-25 per person. In Manhattan. That's borderline impossible anywhere else.

The vibe is loud, cramped, and chaotic — you'll probably share a table with strangers, the waitstaff is efficient but no-nonsense, and the whole place has this incredible energy that feels like being in some underground Tokyo joint. There's also a photo booth and a capsule-toy machine and various other weirdness scattered around. It's the perfect end to a Village food crawl because it's cheap, fun, and totally unique. Nowhere else in the city is like this place.`,
        tip: "Come with a group — the small plates are perfect for sharing. There's often a wait, but it moves fast. Cash is preferred. Try the takoyaki and the fried chicken.",
        tags: ["food", "culture"],
        walkTimeToNext: null,
      },
    ],
  },
  {
    id: "highline-midtown",
    number: 5,
    title: "High Line to Midtown",
    tagline:
      "The elevated park, the best views in the city, and a cocktail at the top of Rockefeller.",
    color: "#B933AD",
    colorName: "purple",
    duration: "~4 hrs",
    distance: "4.8 mi",
    budget: "$$$",
    tags: ["views", "food", "landmarks", "culture"],
    stops: [
      {
        id: "miznon-chelsea-market",
        number: 1,
        name: "Miznon & Chelsea Market",
        lat: 40.7425,
        lng: -74.0064,
        shortDesc:
          "Israeli street food inside Chelsea Market — the roasted cauliflower at Miznon will change your understanding of vegetables.",
        commentary: `Chelsea Market is a food hall inside a former Nabisco factory (this is where the Oreo was invented, seriously) and it's packed with amazing food vendors. There's Los Tacos No. 1, there's the Lobster Place, there's Doughnuttery — it's all great. But I'm sending you specifically to Miznon, which is Israeli chef Eyal Shani's street food spot, because the roasted cauliflower is a life-changing experience.

I know that sounds absurd. "Life-changing cauliflower." But dude, trust me on this. They take a whole head of cauliflower and roast it until it's charred on the outside and impossibly creamy on the inside, and they serve it in a pita or on a plate with tahini. It's smoky and nutty and tender and every person I've brought here has had the same reaction: "How is this just a vegetable?" Get the cauliflower. Also get a lamb or chicken pita because those are incredible too.

Chelsea Market itself is worth wandering around even if you're not eating. The industrial architecture is really cool — exposed brick, old factory elements, funky shops. It can get extremely crowded on weekends, so if you're here on a Saturday, be prepared for some elbow-to-elbow navigation. Weekday mornings are way more chill.`,
        tip: "Go straight to Miznon for the cauliflower pita. Chelsea Market is best on weekday mornings — weekends are a zoo. The market connects directly to the High Line.",
        tags: ["food"],
        walkTimeToNext: 5,
      },
      {
        id: "the-high-line",
        number: 2,
        name: "The High Line",
        lat: 40.742,
        lng: -74.0048,
        shortDesc:
          "A 1.45-mile elevated park built on a former railroad track, with gardens, art, and incredible city views the whole way.",
        commentary: `The High Line is one of the best things New York has done in the last 20 years. It's an elevated park built on a former freight railroad that runs along the west side of Manhattan from the Meatpacking District up to Hudson Yards. The tracks stopped running in 1980 and the structure was almost demolished, but a community group fought to save it and the result is this incredible 1.45-mile elevated greenway with gardens, art installations, and views that will make your jaw drop.

Walking the High Line is like floating above the city. You're up at the second or third floor level of the surrounding buildings, and the landscape architects (Diller Scofidio + Renfro with Piet Oudolf doing the plantings) created this beautiful integration of wildflowers, grasses, and preserved railroad elements. There are sections where the original tracks are still visible through the plantings. The art changes regularly — there are always installations and murals to discover.

The views are the real star though. You get these amazing framed views of the Hudson River, the city streets below, and the architecture on either side. There's a spot where the High Line passes right through a building, and another where you can sit in a kind of amphitheater that frames 10th Avenue like a movie screen. Walk slowly. Stop often. This is not a commute — this is one of the best urban walks in the world.`,
        tip: "Walk north from Chelsea Market entrance toward Hudson Yards. Go in the morning for fewer crowds. The 10th Avenue viewing amphitheater is the highlight — don't miss it.",
        tags: ["walking", "views", "art"],
        walkTimeToNext: 15,
      },
      {
        id: "vessel-hudson-yards",
        number: 3,
        name: "The Vessel & Hudson Yards",
        lat: 40.7538,
        lng: -74.0022,
        shortDesc:
          "The honeycomb-shaped staircase structure at Hudson Yards. Controversial, but visually striking. Edge observation deck is nearby.",
        commentary: `The Vessel is that giant honeycomb-shaped structure at Hudson Yards that looks like a beehive made of staircases. It's 16 stories of interlocking stairways — 154 flights, 2,500 steps, 80 landings — and when it opened in 2019 it was the centerpiece of the brand-new Hudson Yards development. It's designed by Thomas Heatherwick and it's visually striking from every angle.

Now, I should mention that the Vessel has had a complicated history. It was closed for a while due to safety concerns and the climbing experience has been modified with various restrictions. Check the current status before you go because it changes periodically. Even if you can't climb it, it's worth seeing from the outside — the copper-clad structure is genuinely impressive and photographs beautifully.

Hudson Yards itself is this massive new development that's basically a small city built on top of a rail yard. It's got high-end shopping (Cartier, Louis Vuitton, etc.), restaurants, and the Edge observation deck, which is the highest outdoor sky deck in the Western Hemisphere. Edge has a glass floor section and it's absolutely terrifying in the best way. If you do one observation deck in New York, Edge or Top of the Rock are your best bets — Edge is higher, Top of the Rock has the better view because you can see Central Park AND the Empire State Building.`,
        tip: "Check the Vessel's current access status online before visiting. Edge observation deck tickets should be booked in advance — sunset time slots sell out fast.",
        tags: ["landmark", "views"],
        walkTimeToNext: 20,
      },
      {
        id: "bryant-park-library",
        number: 4,
        name: "Bryant Park & NY Public Library",
        lat: 40.7536,
        lng: -73.9832,
        shortDesc:
          "A gorgeous midtown park behind one of the most beautiful buildings in New York — the main branch of the NY Public Library.",
        commentary: `Bryant Park is this green oasis tucked behind the New York Public Library in the middle of midtown, and it's one of the great urban parks in the world. In the summer there are free movies, concerts, and a reading room. In the winter there's an ice skating rink and a holiday market. Year-round it's a perfect spot to sit in a green chair (they're free, just grab one), watch the midtown crowd go by, and take a breather.

But here's what most people miss: GO INSIDE THE LIBRARY. The main branch of the New York Public Library (the Stephen A. Schwarzman Building) is one of the most beautiful buildings in New York City. The main reading room on the top floor — the Rose Main Reading Room — has 52-foot painted ceilings, enormous arched windows, and rows of brass reading lamps. It's absolutely breathtaking. This is where Ghostbusters was filmed. This is where countless writers and researchers have worked for over a century. And it's completely free to walk in and explore.

The library also has incredible rotating exhibitions that are always free. The map collection, the rare books division, the photography archives — this building is a treasure trove. The Beaux-Arts architecture is gorgeous from the outside with those iconic lion statues (their names are Patience and Fortitude), but the interior is where the real magic is. Don't just walk past it. Go inside. Go upstairs. You will not regret it.`,
        tip: "The Rose Main Reading Room on the third floor is the must-see — just walk in and go upstairs. It's free. The lions out front are named Patience and Fortitude.",
        tags: ["culture", "landmark"],
        walkTimeToNext: 8,
      },
      {
        id: "grand-central-terminal",
        number: 5,
        name: "Grand Central Terminal",
        lat: 40.7527,
        lng: -73.9772,
        shortDesc:
          "Not just a train station — a Beaux-Arts masterpiece with a celestial ceiling, a whispering gallery, and incredible hidden details.",
        commentary: `Grand Central Terminal is probably the most beautiful train station in the world. The main concourse is this cavernous Beaux-Arts hall with 75-foot windows, Tennessee marble floors, and a ceiling painted with the constellations of the zodiac — backwards, technically, because the artist painted them as God would see them looking down, not as we see them from earth. There are over 2,500 stars up there, and some of them have tiny lights that actually twinkle. It's magnificent.

Go to the lower level and find the Whispering Gallery — it's right outside the Oyster Bar restaurant. Stand in one corner of the arched space, have someone stand in the opposite diagonal corner about 30 feet away, and whisper into the wall. The other person will hear you perfectly clearly. The acoustics of the Guastavino tile arches create this perfect sound channel that carries whispers across the space. It's been delighting people for over a hundred years.

There's also a dark patch on the ceiling near the east end — that's what the original ceiling looked like before they cleaned it in the 1990s. The entire ceiling was that dark from decades of cigarette smoke and diesel fumes. They left one small patch uncleaned so people could see the dramatic difference. Look for it in the corner near the Vanderbilt Avenue side. Also, there's a hidden tennis club on the top floor. You can't go in, but it exists, and that's the most New York thing I've ever heard.`,
        tip: "The Whispering Gallery is in the lower level near the Oyster Bar — stand in the corner and whisper, it's wild. Look for the uncleaned patch on the ceiling to see the before/after.",
        tags: ["landmark", "architecture"],
        walkTimeToNext: 10,
      },
      {
        id: "times-square",
        number: 6,
        name: "Times Square",
        lat: 40.758,
        lng: -73.9855,
        shortDesc:
          "Sensory overload central. Walk through, take it in, but don't stop. Every New Yorker's most complicated relationship.",
        commentary: `Okay. Times Square. Deep breath. Here's the thing — every New Yorker will tell you Times Square is terrible and you should avoid it. And they're not wrong, exactly. It's obscenely crowded, aggressively commercial, full of chain restaurants and people in costume trying to charge you for photos, and it's basically a giant outdoor mall wrapped in LED screens. It's the physical manifestation of overstimulation.

BUT. You should still see it. At least once. Because there is genuinely nothing else like it on earth. The sheer scale of the lights and screens and noise and humanity is something that has to be experienced in person. Photos and videos don't capture it — the way the light bounces off everything, the constant motion, the volume, the energy. It's wild. Stand in the middle of the red stairs at the TKTS booth, look around in every direction, and just absorb it for a few minutes.

My advice: walk through, don't stop for long, and absolutely do not eat here. Every restaurant in Times Square is a tourist trap with mediocre food at inflated prices. Don't buy anything from people on the street. Don't pose with the costumed characters unless you're prepared to tip $5-10. Just experience the spectacle, appreciate it for what it is, and then get out. The rest of midtown is waiting and it's much better.`,
        tip: "Walk through, don't eat here, don't stop for costumed characters. The TKTS red stairs are the best vantage point. Check TKTS for discounted Broadway tickets if you're interested.",
        tags: ["landmark"],
        walkTimeToNext: 8,
      },
      {
        id: "rockefeller-center",
        number: 7,
        name: "Rockefeller Center & Top of the Rock",
        lat: 40.7587,
        lng: -73.9787,
        shortDesc:
          "Art Deco masterpiece. Get cocktails at Bar SixtyFive or go to Top of the Rock for the best panoramic views in the city.",
        commentary: `Rockefeller Center is one of the greatest Art Deco complexes in the world — 19 buildings built in the 1930s with incredible limestone facades, murals, and sculptures. The Atlas statue on Fifth Avenue, the golden Prometheus over the skating rink (or outdoor restaurant in summer), the massive Christmas tree in December — this place is iconic in every season.

But here's my real recommendation: Top of the Rock. If you're going to do one observation deck in New York, this is the one. Yes, the Empire State Building is more famous, but here's the problem — when you're standing on the Empire State Building, you can't see the Empire State Building. From Top of the Rock, you get the Empire State Building right in front of you AND Central Park stretching out to the north AND the Freedom Tower to the south. It's the complete package.

Even better move: skip the observation deck and go to Bar SixtyFive on the 65th floor of 30 Rock. Same building, nearly the same views, but you're sitting at a bar with a cocktail instead of standing on a crowded observation deck. Drinks are expensive ($20-30 range) but you're not paying the observation deck admission ($40+) so it actually works out better. The views are absolutely extraordinary, especially at sunset. Get a Manhattan at a bar 65 stories above Manhattan. Come on. That's perfect.`,
        tip: "Bar SixtyFive on the 65th floor has the same views as Top of the Rock but with cocktails and no observation deck fee. Reservations are recommended, especially for sunset.",
        tags: ["views", "drinks", "iconic"],
        walkTimeToNext: 10,
      },
      {
        id: "fifth-avenue-apple",
        number: 8,
        name: "Fifth Avenue & Apple Store",
        lat: 40.7639,
        lng: -73.973,
        shortDesc:
          "The world's most famous shopping street and the iconic glass cube Apple Store that never closes.",
        commentary: `Fifth Avenue between Rockefeller Center and Central Park is the most famous shopping street on the planet. Tiffany's, Bergdorf Goodman, Saks, Cartier, Prada — every luxury brand in the world has a flagship store here. Even if you're not buying anything (and honestly, who is at these prices), the window displays alone are worth the walk, especially around the holidays when they go absolutely all-out.

The Apple Store is at 59th Street, right at the corner of Central Park. You know it even if you don't know you know it — it's the one with the giant glass cube entrance. Designed by Bohlin Cywinski Jackson, the cube is 32 feet on each side and made entirely of glass panels. It's become one of the most recognizable pieces of modern architecture in New York. Below the cube is the actual store, which is underground and open 24 hours a day, every day of the year. Even on Christmas. Even at 3 AM. Capitalism never sleeps.

Even if you don't care about Apple products, the cube is worth seeing as an architectural landmark. And the store is a good place to charge your phone, use the bathroom, and warm up (or cool down, depending on the season). It's right at the entrance to Central Park at 59th and 5th, which is the perfect transition into the last stop on this route.`,
        tip: "The Apple Store has free Wi-Fi, clean bathrooms, and is open 24/7 — useful in an emergency. St. Patrick's Cathedral is a few blocks south and worth a quick look inside (free).",
        tags: ["shopping", "landmark"],
        walkTimeToNext: 5,
      },
      {
        id: "central-park-highlights",
        number: 9,
        name: "Central Park Highlights",
        lat: 40.7736,
        lng: -73.9712,
        shortDesc:
          "Bethesda Fountain, Belvedere Castle, rowboats on the Lake, Shakespeare Garden, and the Bow Bridge — the heart of Central Park.",
        commentary: `Central Park is 843 acres of green in the middle of Manhattan and it's genuinely one of the great achievements of urban planning in human history. Frederick Law Olmsted and Calvert Vaux designed it in the 1850s and every rock, every hill, every body of water was placed intentionally. Nothing in this park is natural — it's all engineered — and yet it feels completely organic. That's the genius.

The must-see spots: Bethesda Fountain is the centerpiece, a gorgeous angel statue over a tiered fountain at the heart of the park. The Bethesda Terrace below it has these incredible Minton tile ceilings and is one of the most beautiful covered walkways in the city. The Bow Bridge is the most photographed bridge in the park — cast iron, painted white, spanning the Lake. Belvedere Castle is a mini castle on a rock outcropping with views over the Great Lawn and the entire park. The Shakespeare Garden is a hidden gem with plantings referenced in Shakespeare's plays.

Rent a rowboat at the Loeb Boathouse (about $20/hour) and row around the Lake — it's romantic, peaceful, and gives you totally different views of the park. Or just walk. You could spend an entire day here and not see everything. The Ramble is a wild, wooded section that feels like you're in a forest, not midtown Manhattan. Strawberry Fields near the West 72nd entrance is the John Lennon memorial. The Great Lawn is where New Yorkers go to sunbathe, play frisbee, and pretend they're not surrounded by 8 million people. Central Park is magical. Give it time.`,
        tip: "Enter at 59th & 5th and walk north. The Bethesda Fountain and Bow Bridge are the must-sees. Rowboat rental at Loeb Boathouse is $20/hr — cash only, totally worth it.",
        tags: ["walking", "landmark", "culture"],
        walkTimeToNext: null,
      },
    ],
  },
];

export const bonusItems: BonusItem[] = [
  {
    id: "met-cloisters",
    name: "The Met Cloisters",
    lat: 40.8649,
    lng: -73.9318,
    category: "museums",
    commentary:
      "Dude, the Cloisters is SICK. It's a branch of the Metropolitan Museum of Art but it's all the way up in Fort Tryon Park at the tippy top of Manhattan, and it's entirely dedicated to medieval art and architecture. The building itself incorporates actual pieces of medieval European cloisters that were shipped over stone by stone. You're walking through real 12th-century archways and gardens overlooking the Hudson River. It feels like you've teleported to a monastery in southern France. It's far from everything else on this guide but if you have a spare half-day, the trip is absolutely worth it. The Unicorn Tapestries alone are worth the subway ride.",
    tip: "Take the A train to 190th Street. Your Met Museum ticket includes same-day Cloisters admission. Fort Tryon Park around it is gorgeous too.",
  },
  {
    id: "moma",
    name: "MoMA (Museum of Modern Art)",
    lat: 40.7614,
    lng: -73.9776,
    category: "museums",
    commentary:
      "MoMA is one of the most important art museums on the planet. Starry Night by Van Gogh is here. Picasso's Les Demoiselles d'Avignon is here. Warhol's Campbell's Soup Cans, Monet's Water Lilies, Dali's Persistence of Memory — all here. The collection is genuinely staggering and the building itself was recently renovated and expanded. Even if you're not a huge art person, seeing these paintings in person hits different than seeing them in a textbook. The sculpture garden is a nice outdoor break from the galleries, and the museum restaurant (The Modern) is excellent if pricey.",
    tip: "Fridays from 4-8 PM are free (sponsored by Uniqlo). Buy tickets online to skip the line otherwise. The fifth floor (painting and sculpture) is the must-see.",
  },
  {
    id: "natural-history-museum",
    name: "American Museum of Natural History",
    lat: 40.7813,
    lng: -73.974,
    category: "museums",
    commentary:
      "You know this museum from Night at the Museum and that's actually a pretty accurate representation of how enormous and varied this place is. The dinosaur halls on the fourth floor are world-class — the T. Rex and Apatosaurus skeletons are jaw-dropping. The whale room (Milstein Hall of Ocean Life) with the 94-foot blue whale model hanging from the ceiling is iconic. The Rose Center for Earth and Space is a massive glass sphere that houses a planetarium and it looks incredible at night when it's all lit up. The new Gilder Center addition has a stunning insectarium and an immersive butterfly vivarium. You could easily spend a full day here.",
    tip: "Start on the fourth floor with the dinosaurs — that's what everyone comes for and it delivers. The suggested admission price is just that — suggested. Pay what you wish.",
  },
  {
    id: "roosevelt-island-cable-car",
    name: "Roosevelt Island Tramway",
    lat: 40.7613,
    lng: -73.9495,
    category: "experiences",
    commentary:
      "This aerial tramway connects Manhattan's Upper East Side to Roosevelt Island, and it costs the same as a subway ride — just swipe your MetroCard or tap your OMNY. The ride takes about 3 minutes and you're suspended 250 feet above the East River with incredible views of the Queensboro Bridge, the Manhattan skyline, and the river. It's one of the coolest cheap thrills in the city. Roosevelt Island itself is a quiet little residential island with a nice park, the ruins of a smallpox hospital at the south end (seriously), and the FDR Four Freedoms Park, which is a beautiful memorial designed by Louis Kahn.",
    tip: "Use a regular MetroCard or OMNY tap — same $2.90 fare as the subway. The tram runs every 7-15 minutes. Best at sunset for golden light on the skyline.",
  },
  {
    id: "staten-island-ferry-bonus",
    name: "Staten Island Ferry",
    lat: 40.6433,
    lng: -74.072,
    category: "experiences",
    commentary:
      "I mention this in the Financial District route too, but it bears repeating: the Staten Island Ferry is completely FREE and gives you incredible views of the Statue of Liberty, the Manhattan skyline, and the harbor. It's a 25-minute ride each way and it runs 24/7. This is the best free activity in New York City and it's not even close. Go at sunset for golden light on the skyline. Stand on the right side heading to Staten Island for the best Statue views. When you arrive at Staten Island, just walk off and walk right back on the next boat back.",
    tip: "Sunset is the magic hour — the Manhattan skyline turns gold. Grab a beer from the snack bar on board. There's no ticket needed, just walk on.",
  },
  {
    id: "brighton-beach",
    name: "Brighton Beach & Coney Island",
    lat: 40.5776,
    lng: -73.9614,
    category: "neighborhoods",
    commentary:
      "Okay this one is personal — Brighton Beach is basically my hometown. It's Little Russia by the sea, and it's unlike anywhere else in New York. The main strip on Brighton Beach Avenue under the elevated subway tracks is lined with Russian grocery stores, restaurants, and bakeries. Get pelmeni (Russian dumplings), grab some smoked fish from one of the markets, and eat on the boardwalk overlooking the Atlantic Ocean. Walk along the boardwalk to Coney Island next door where you've got Luna Park (rides, games, the famous Cyclone roller coaster from 1927), Nathan's Famous hot dogs (the original location), and the beach itself. It's a whole day trip and it's worth every minute.",
    tip: "Take the B or Q train to Brighton Beach — it's about 45 minutes from Midtown. Tatiana Restaurant on the boardwalk for a full Russian experience. Combine with Coney Island for a full day.",
  },
  {
    id: "williamsburg",
    name: "Williamsburg",
    lat: 40.7081,
    lng: -73.9571,
    category: "neighborhoods",
    commentary:
      "Williamsburg is hipster Brooklyn ground zero and while that word has become a cliche, the neighborhood genuinely delivers. Bedford Avenue is the main strip and it's packed with independent boutiques, vintage shops, record stores, coffee roasters, and some of the best restaurants in the city. The street art on the surrounding blocks is incredible — full building murals everywhere. The waterfront has been developed with parks that have amazing Manhattan skyline views. Smorgasburg food market happens here on weekends in the warmer months and it's the best outdoor food market in the city — dozens of vendors selling everything from ramen burgers to artisanal ice cream.",
    tip: "Take the L train to Bedford Avenue. Saturday Smorgasburg (April-October) in Marsha P. Johnson State Park is a must. Domino Park on the waterfront for skyline views.",
  },
];

export function getRoute(id: string): Route | undefined {
  return routes.find((route) => route.id === id);
}

export function getRouteStop(
  routeId: string,
  stopId: string
): Stop | undefined {
  const route = getRoute(routeId);
  if (!route) return undefined;
  return route.stops.find((stop) => stop.id === stopId);
}
