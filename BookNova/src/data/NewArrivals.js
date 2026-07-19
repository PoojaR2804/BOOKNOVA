import psychology from "../assets/books/psychology.jpg";
import ikigai from "../assets/books/ikigai.jpg";
import monk from "../assets/books/monk.jpg";
import goggins from "../assets/books/goggins.jpg";

const books = [
  {
    id: 101,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Fiction",
    price: 299,
    image: "https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg",
    pdf: "https://www.gutenberg.org/files/1342/1342-h/1342-h.htm",
    Pages:352,
    Ratings:4.8,
    aboutAuthor:
      "Jane Austen was one of England's greatest novelists. Her novels explore love, society, and family relationships with wit and timeless insight.",
    preview: `Chapter 1

It is a truth universally acknowledged, that a single man in possession
of a good fortune, must be in want of a wife.

However little known the feelings or views of such a man may be on his
first entering a neighbourhood...`
  },

  {
    id: 102,
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
     category: "Mystery",
    price: 349,
    image: "https://www.gutenberg.org/cache/epub/1661/pg1661.cover.medium.jpg",
    pdf: "https://www.gutenberg.org/files/1661/1661-h/1661-h.htm",
    Pages:316,
    Ratings:4.5,
    aboutAuthor:
      "Sir Arthur Conan Doyle was a British writer best known for creating Sherlock Holmes, the world's most famous fictional detective.",
    preview: `Adventure I

To Sherlock Holmes she is always THE woman.

I have seldom heard him mention her under any other name.
In his eyes she eclipses and predominates the whole of her sex...`
  },

  {
    id: 103,
    title: "Treasure Island",
    author: "Robert Louis Stevenson",
    category: "Adventure",
    price: 119,
    image: "https://www.gutenberg.org/cache/epub/120/pg120.cover.medium.jpg",
    pdf: "https://www.gutenberg.org/files/120/120-h/120-h.htm",
    Pages:116,
    Ratings: 4.0,
    aboutAuthor:
      "Robert Louis Stevenson was a Scottish novelist and travel writer. He is celebrated for his adventure stories, especially Treasure Island.",
    preview: `Chapter I

The Old Sea-dog at the Admiral Benbow

Squire Trelawney, Dr. Livesey, and the rest of these gentlemen having
asked me to write down the whole particulars about Treasure Island...`
  },

  {
    id: 104,
    title: "The Wonderful Wizard of Oz",
    author: "L. Frank Baum",
    category: "Fantasy",
    price: 299,
    image: "https://www.gutenberg.org/cache/epub/55/pg55.cover.medium.jpg",
    pdf: "https://www.gutenberg.org/files/55/55-h/55-h.htm",
    Pages:250,
    Ratings:4.2,
    aboutAuthor:
      "L. Frank Baum was an American author best known for creating the magical Land of Oz and its beloved characters.",
    preview: `Chapter 1

The Cyclone

Dorothy lived in the midst of the great Kansas prairies,
with Uncle Henry and Aunt Em.

Their small house stood alone upon the vast gray landscape...`
  }
];

export default books;