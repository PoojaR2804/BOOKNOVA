import pride from "../assets/books/pride.jpg";
import alice from "../assets/books/alice.jpg";
import sherlock from "../assets/books/sherlock.jpg";
import dorian from "../assets/books/dorian.jpg";
import timemachine from "../assets/books/timemachine.jpg";
import treasure from "../assets/books/treasure.jpg";
import dracula from "../assets/books/dracula.jpg";
import frankenstein from "../assets/books/frankenstein.jpg";


const books = [
  {
    id: 1,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Fiction",
    price: 199,
    category: "Fiction",
    image: "https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg",
     pdf: "/books/PrideAndPrejudice.pdf",
     Pages:352,
     Ratings:4.8,
     aboutAuthor: "Jane Austen (1775–1817) was one of England's greatest novelists. She is famous for her insightful stories about love, society, and family life. Her novels include Pride and Prejudice, Emma, and Sense and Sensibility.",
     preview: `Chapter 1
     It is a truth universally acknowledged, that a single man in possession
of a good fortune, must be in want of a wife.

However little known the feelings or views of such a man may be on his
first entering a neighbourhood...`
  },
  {
    id: 2,
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    category: "Fiction",
    price: 149,
    image: "https://www.gutenberg.org/cache/epub/11/pg11.cover.medium.jpg",
    pdf: "/books/AliceInWonderland.pdf",
    Pages:146,
    Ratings:4.5,
    aboutAuthor: "Lewis Carroll (1832–1898) was an English writer, mathematician, and photographer. He is best known for Alice's Adventures in Wonderland and Through the Looking-Glass.",
    preview: `Chapter 1

Alice was beginning to get very tired of sitting by her sister on the bank,
and of having nothing to do.

Once or twice she had peeped into the book her sister was reading,
but it had no pictures or conversations in it.

Suddenly, a White Rabbit with pink eyes ran close by her...
`
  },
  {
    id: 3,
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
     category: "Mystery",
    price: 200,
    image:  "https://www.gutenberg.org/cache/epub/1661/pg1661.cover.medium.jpg",
    pdf: "/books/SherlockHolmes.pdf",
    Pages:316,
    Ratings:4.2,
    aboutAuthor: "Sir Arthur Conan Doyle (1859–1930) was a British writer and physician. He created the world-famous detective Sherlock Holmes, whose stories remain among the most popular mystery novels ever written.",
    preview: `Chapter 1

To Sherlock Holmes she is always THE woman.

I have seldom heard him mention her under any other name.

Holmes sat quietly in his chair, studying every detail of the mysterious
case before him with remarkable observation and logic...
`
  },
  {
    id: 4,
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    category: "Classic",
    price: 299,
    image: "https://www.gutenberg.org/cache/epub/174/pg174.cover.medium.jpg",
    pdf: "/books/DorianGray.pdf",
    Pages:326,
    Ratings:3.8,
    aboutAuthor: "Oscar Wilde (1854–1900) was an Irish poet, playwright, and novelist. Known for his wit and literary brilliance, his only novel, The Picture of Dorian Gray, is considered a classic of English literature.",aboutAuthor: "H. G. Wells (1866–1946) was an English novelist often called the 'Father of Science Fiction.' His famous works include The Time Machine, The Invisible Man, and The War of the Worlds.",
    preview: `Chapter 1

The studio was filled with the rich scent of roses.

As the artist admired his latest masterpiece,
Dorian Gray stood before the portrait, unaware of the extraordinary
destiny that awaited him.

Beauty, youth, and ambition soon changed everything...
`
  },
  {
    id: 5,
    title: "The Time Machine",
    author: "H. G. Wells",
     category: "Science Fiction",
    price: 199,
    image: "https://www.gutenberg.org/cache/epub/35/pg35.cover.medium.jpg",
    pdf: "/books/TheTimeMachine.pdf",
    Pages:134,
    Ratings:4.9,
    aboutAuthor: "H. G. Wells (1866–1946) was an English novelist often called the 'Father of Science Fiction.' His famous works include The Time Machine, The Invisible Man, and The War of the Worlds.",
    preview: `Chapter 1

The Time Traveller gathered his friends together
to explain a revolutionary idea.

He believed that time was simply another dimension
through which it was possible to travel.

No one imagined what he would soon discover in the distant future...
`
  },
  {
    id: 6,
    title: "Treasure Island",
    author: "Robert Louis Stevenson",
    category: "Adventure",
    price: 199,
    image: "https://www.gutenberg.org/cache/epub/120/pg120.cover.medium.jpg",
    pdf: "/books/TreasureIsland.pdf",
    Pages:116,
    Ratings:4.0,
    aboutAuthor: "Robert Louis Stevenson (1850–1894) was a Scottish novelist and travel writer. He is best known for Treasure Island, Kidnapped, and Strange Case of Dr Jekyll and Mr Hyde.",
    preview: `Chapter 1

Squire Trelawney, Dr. Livesey, and the rest of these gentlemen
asked me to write down the whole story of Treasure Island.

It all began when an old sailor arrived at the Admiral Benbow Inn,
bringing with him a mysterious sea chest and an old treasure map...
`

  },
  {
    id: 7,
    title: "Dracula",
    author: "Bram Stoker",
    category: "Horror",
    price: 299,
    image: "https://www.gutenberg.org/cache/epub/345/pg345.cover.medium.jpg",
    pdf: "/books/Dracula.pdf",
    Pages:216,
    Ratings:3.9,
    aboutAuthor: "Bram Stoker (1847–1912) was an Irish author best known for writing Dracula, one of the most influential horror novels ever published.",
    preview: `Chapter 1

Jonathan Harker began his journey toward Castle Dracula.

As darkness fell over the Carpathian Mountains,
the villagers warned him not to continue.

Ignoring their fears, he pressed on toward the mysterious castle...
`
    
  },
  {
    id: 8,
    title: "Frankenstein",
    author: "Mary Shelley",
    category: "Science Fiction",
    price: 249,
    image: "https://www.gutenberg.org/cache/epub/84/pg84.cover.medium.jpg",
    pdf: "/books/Frankenstein.pdf",
    Pages:236,
    Ratings:4.3,
    aboutAuthor: "Mary Shelley (1797–1851) was an English novelist who wrote Frankenstein at the age of eighteen. She is regarded as one of the pioneers of science fiction.",
    preview: `Chapter 1

You will rejoice to hear that no disaster has accompanied
the commencement of my voyage.

Victor Frankenstein devoted himself to the pursuit of scientific knowledge,
never imagining the consequences of creating life itself...
`
  },
];

export default books;