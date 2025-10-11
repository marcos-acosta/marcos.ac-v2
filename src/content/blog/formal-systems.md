---
title: "Why is math always right?"
description: "An introduction to formal systems and why they work"
pubDate: 'Dec 12 2024'
heroImage: '../../assets/formal-systems/math-box.png'
tags: 'essays,math'
---

> Note: This essay is part of a series I was writing called "No Dumb Questions", which was originally published as a separate blog.

The title for this essay was originally "Mechanized reasoning: What are formal systems?", but the term "formal system" sparks about as much excitement as "tapioca flour", or "utility closet", so I opted for a more evocative headline. As we begin, it may not be immediately apparent what formal systems have to do with the titular question, but I promise that it'll soon become very clear.

My main goal for this article is that, after reading it, you will have a complete understanding of what a formal system is and how one can be used to model the "real world". There’ll be a lot of technical details to start, but then we’ll take a step back to touch on a few really intriguing mathematical and philosophical topics. My stretch goal is to leave you with a sense of wonder for what math even _is_.

With that said, grab your fanciest Sunday clothes, because we’re getting formal.

## What is a formal system?

Let’s lay some groundwork. In formal systems, everything we manipulate is a **string**, which I’ll show in a monospace font, like `abc` and `s8'4:;2op`. Strings are made up of **symbols** (think characters) and don’t inherently mean anything. Some strings are "in" the system, while others aren’t. How do we know which ones? For one thing, a formal system has at least one string that we just take for granted to be in the system, like a freebie. These are called **axioms**. A formal system also has rules for how to take an existing string in the system and create a new one that is also in the system. These rules are called **rules of deduction**, or **rules of inference**, and the new strings they generate are called **theorems**.

This might sound a little abstract right now, so let’s play around with a concrete example. I’ll borrow one from Douglas Hofstadter’s book _Gödel, Escher, Bach_, which he calls the P-Q System. I modified it slightly because why not, life is short.

> **The P-Q System (Marcos’s version)**
>
> Allowed symbols: `-` (hyphen), `p`, and `q`
>
> _Axioms_
>
> - **Axiom 1**: `-p-q--`
>
> _Rules of inference_
>
> - **Rule 1**: If `{x}p{y}q{z}` is a theorem, where _x_, _y_, and _z_ are all made of hyphens, then `{x}-p{y}q{z}-` is also a theorem.
> - **Rule 2**: If `{x}p{y}q{z}` is a theorem, where _x_, _y_, and _z_ are all made of hyphens, then `{y}p{x}q{z}` is also a theorem.

As you can see, when defining rules, we can use "variables" to stand in for parts of a string. I chose to show those variables with curly braces, like `{x}`, but it’s important to point out that it’s a convenience notation only; `{`, `}`, `x`, `y`, and `z` are symbols that don’t belong to this system and could therefore never appear in a string of the P-Q System.

With that said, let’s light the fire, grease our skillet, and cook.

### Playing around

The obvious first thing to do is start deriving some theorems of the P-Q System.

> Theorem 1. `--p-q---` (by Rule 1 on Axiom 1)
> Theorem 2. `-p--q---` (by Rule 2 on Theorem 1)
> Theorem 3. `---p-q----` (by Rule 1 on Theorem 1)
> Theorem 4. `-p---q----` (by Rule 2 on Theorem 3)
> Theorem 5. `--p—q---` (by Rule 1 on Theorem 2)

Congratulations! We’ve discovered 5 theorems of the P-Q system.

Note that the process of generating new theorems is purely **typographical**. What I mean by this is that we’re not dealing with the _meaning_ of anything when we follow the rules of inference, we’re just erasing, adding, or changing symbols on a page (or screen).

Another thing you might notice is that all theorems of the P-Q System will have a similar _form_. That is, they all begin with a group of hyphens followed by a `p`, then another group of hyphens followed by a `q`, then a final group of hyphens. Just to give this a name, let’s call strings that follow this pattern **well-formed** strings.

At this point, you might be waiting for me to tell you the whole point of this stupid thing, and why we’re mindlessly shoving around `p` s, `q` s, and hyphens. As it so happens, this system was intentionally designed to _represent_ a concept very familiar to us. If it hasn’t jumped out at you, take a closer look at the rules and the theorems we’ve deduced and see if it reminds you of anything.

As you may have already noticed, the P-Q System is a representation of addition! More specifically, the addition of two [natural numbers](https://en.wikipedia.org/wiki/Natural_number). The similarity becomes apparent when we _interpret_ the symbols in a certain way:

`p` = plus, `q` = equals, `-` = one, `--` = two, `---` = three, etc...

This is interesting. Our formal system’s definition says nothing about math, addition, or even _numbers_ at all. And yet, purely by virtue of the rules of deduction and axiom we chose, its resemblance to addition is undeniable.

### Isomorphism

This "resemblance" is a great example of **isomorphism**, which is arguably the most important concept in this essay, and I’ll write more about it separately. To put it loosely, isomorphism refers to a situation where "all the parts of one thing line up with the parts of another". For example, take the Internet and the road system. One could look at these two things and argue that they’re nothing alike; one is made up of silicon and fiber-optic cables, and the other pavement.

But it’s much more human to notice the similarity in their _form_; how each element of one maps onto the other. The data packets of the Internet map onto the vehicles on the highway, websites map to physical destinations, IP addresses map to building addresses, routers map to traffic intersections, so on and so forth. One could argue that this isomorphism is not perfect (e.g. it’s not clear what the drivers _in_ the vehicle would map to), but there’s clearly something there. The isomorphism is also definitely stronger than, say, a toaster and a boat, whose key features don’t really correspond to each other at all.

Returning now to the P-Q System, we hopefully have a newfound appreciation for the isomorphism it makes to the process of addition. At this point, we have to ask ourselves[^1], what even _is_ addition?

One way to look at addition is a side effect of the fact that numbers are ordered. Let’s go back to the first grade level: if you have 2 cookies, and then you have 3 more, how many cookies do you have in total? Well, you can count the first two cookies and arrive at 2, and then you count three higher than that to arrive at the fifth number, 5. This is expressed by Rule 1 of the P-Q System. Additionally (no pun intended), you could have counted the three cookies first instead, and then counted two higher, and gotten the same result. This is expressed by Rule 2 of the P-Q System.[^2] These two facts about addition are just what we _mean_ by addition; we just take for granted that’s what it means and we wouldn’t want it to be any other way.[^3] Since the P-Q system encodes these two key mechanisms of addition in its rules of inference, it’s easy to see the isomorphism between the two.[^4]

### Misconception busting

At this point, I can imagine a few possible misconceptions that might be arising, so I want to crush them immediately. For one thing, the P-Q System is not "the formal system for natural number addition". For one thing, the symbols we chose were arbitrary, but moreover, there are infinitely many formal systems that could represent this kind of addition. As I alluded to, Hofstadter’s version also represents addition, but his axioms and rules of inference differ from mine. And _more_ moreover, this same system could be used to represent something else, like subtraction (just let `p` map to "equals" and `q` map to "subtracted from"), or something _else_ that we haven’t even thought of. And finally, don’t assume that all formal systems need to necessarily represent something. For example, take this random formal system:

> **Random Formal System**
>
> Allowed symbols: `a` through `z` and `6`
>
> _Axioms_
>
> - **Axiom 1**: `ah6r`
> - **Axiom 2**: `dddd`
>
> _Rules of inference_
>
> - **Rule 1**: If `a{x}` is a theorem, where _x_ is a string of at least one symbol, then `{x}l6s{x}` is also a theorem.
> - **Rule 2**: If `{x}d{x}` is a theorem, where _x_ is a string of at least one symbol, then `a{x}ii` is also a theorem.

I have no idea what, if anything, this system could possibly represent. But maybe, by pure coincidence, it happens to be isomorphic to something out there in the world. Who’s to say?

### Tackling truth: soundness and completeness

As we pointed out, the P-Q System generates theorems that represent statements about the addition of two natural numbers. Intuitively, we can see that it only produces _true_ equations; we’ll never find that e.g. `-p--q--` is a theorem. Can we prove this? Here’s a sketch of a proof:

> **Proof of the Soundness of the P-Q System**
>
> Our only axiom `-p-q--` represents 1+1=2, which is true. Rule 1 represents adding 1 to both sides of the equation, which will always result in a true statement of addition. Rule 2 commutes the two terms being added, which will never change the truth value of the equality. Therefore, since our only axiom is true and all rules of production generate true statements when applied to a true statement, all theorems of the P-Q System represent true statements of natural number addition.

We can go a step further, though. Just because our system only generates true statements doesn’t mean it’s capable of generating _all_ true statements about the addition of two natural numbers. Just take out either Rule 1 or Rule 2 and you’ll have an example of such a system. But as you probably already sensed, the P-Q System _is_ capable of generating all true statements of this type. Here’s a rough sketch of that proof:

> **Proof of the Completeness of the P-Q System**
>
> Take an arbitrary true equation a+b=c, where _a_, _b_, and _c_ are all natural numbers. Call this equation _E_. We will construct a theorem in the P-Q System that represents _E_. Starting from `-p-q--` (Axiom 1), we first apply Rule 1 (_b_-1) times until we have `{y}p-q-{y}`, where _y_ is a substring containing _b_ many hyphens. Then we apply Rule 2 to derive `-p{y}q-{y}`. Then, we apply Rule 1 (_a_-1) more times to get `{x}p{y}q{y}{x}`, where _x_ is a substring containing _a_ many hyphens. Call this whole string _S_. Note that `{y}{x}` is a string with _a_+_b_ many hyphens i.e. _c_ many hyphens. Therefore, _S_ is a theorem of the P-Q System that represents _E_ when interpreted. And since _E_ can be _any_ arbitrary true equation about the addition of two natural numbers, all such true equations are represented by theorems of the P-Q System.

As I already gave away in the proof titles, if we can show that every theorem of a system yields a true statement when interpreted, we say the system is **sound**. If we can show that every true statement (within some domain, like "addition of two natural numbers" or "all facts of number theory") is a theorem of a system, we call that system **complete**. Note that the P-Q System is complete within the domain of adding two natural numbers, but _not_ three (or more) natural numbers, rational numbers, real numbers, etc. It does one thing but it does it well.

Completeness may sound like a high bar, but on its own, it’s actually very easy to achieve. To demonstrate, I will debut my Complete System of Mathematics, in which all mathematical truths, in number theory and beyond, are theorems.

> **Complete System of Mathematics (CSM)**
>
> Allowed symbols: All symbols used in mathematics
>
> _Axioms_
>
> - **Axiom 1**: ø (the empty string)
>
> _Rules of inference_
>
> - **Rule 1**: If `{x}` is a theorem, where _x_ is a string of 0 or more characters, then `{x}{y}` is also a theorem, where _y_ is any symbol of mathematics.

As you can see, all mathematical truths are theorems of CSM. The [Riemann Hypothesis](https://en.wikipedia.org/wiki/Riemann_hypothesis) is a theorem, along with its negation, just to be safe. Every possible addition, true or false, is a theorem. I await my prize.

Obviously, CSM is not sound, which is a glaring problem. In reality, an unsound system is basically useless; by comparison, completeness is just a "nice-to-have". With that in mind, we can return to fully appreciate the P-Q System; addition of natural numbers may not be the most exciting thing in the world, but it can be _fully represented_ by something as simple as a two-rule formal system.

One last thing to note is that we’re generally only interested in the truth value of _well-formed_ strings. We’re not interested in whether `pqq` is true, because it doesn’t make sense in our interpretation. Even a string like `-p-p-q---`, which _seems_ like it "should" be a theorem, is not well-formed in the P-Q System. Our system was not designed to represent the addition of three numbers, so this string doesn’t make sense in that very narrow context. We have a similar understanding in mathematics; it actually means something to say that `2+2=5` is false. It doesn’t really mean anything to discuss whether `+2(5=` is true or not. We use the idea of well-formed strings to "filter out" the truly meaningless strings.

### Mindless symbol-pushing rules somehow capture truth?

At this point, it’s natural to philosophize a little bit about what’s actually happening when we use symbols and rules to represent reality and "truth".

For one thing, by constructing the P-Q System, did we _gain_ any new insight about the concept of addition? On one hand, this system can represent additions that are too big to practically verify by counting. But really, we wouldn’t be surprised by any of these "discoveries"; addition is crazy simple, and we already know how to easily derive the truth value of any particular equation involving the sum of two numbers by using a shortcut for counting (more on this later). In other words, we kinda got out of it what we put into it.

We might be tempted to throw our hands in the air and say, "Formal systems are useless! They only tell us things we already know!" And there is an element of truth to that. But I’d like to point out a silver lining. Mathematics, in its most formal setting, is a formal system. I won’t elaborate on how or why this is true, because that’s a whole other topic that will get its own essay.[^5] But for now, you can just take my word on this.

Then my question is: could we have invented the Internet without the tool of mathematics? Answering "yes" would put you squarely in clown territory. Let’s take electricity, which is a cornerstone of the Internet. Humans have been aware of electricity for at least [two thousand years](https://en.wikipedia.org/wiki/Electricity#History), but our ability to quantify _exactly_ how it works was dependent on the invention of symbolic mathematics and advanced mathematical tools like calculus. Obviously, deriving the laws of electromagnetism also required some experimental observation and insight on the physicists’ part to figure out which mathematical steps to take. But nonetheless, I think it’s unimaginable that some great genius in an alternate reality where symbolic math didn’t exist could come up with some non-symbolized version of [Maxwell’s Equations](https://en.wikipedia.org/wiki/Maxwell%27s_equations). It seems impossible that the kinds of abstractions necessary to describe electricity and magnetism could be accurately represented in our lumps of gray matter without some formalization. By analogy, imagine designing a building where you can only express your blueprint with vague terms like "heavy", or "long", or "at a wide angle". That might work for a small hut, but not a skyscraper.

So, we wind up in a strange place. On one hand, formal systems possess absolutely no intelligence whatsoever, they’re just a bunch of rules for moving meaningless symbols around; we get out of it what we put into it. But on the other hand, when we build formal systems powerful enough to represent slices of the real world (addition, geometry, rates of change, etc.) and pair it with some experimental data, we steal fire from the gods, harness electromagnetism, and invent the Internet; we get out of it much more than we put into it. This should feel a little strange.

### A test for theoremhood!

Easing our foot off of the philosophical gas pedal, I want to return to something I alluded to earlier when I said:

> We already know how to easily derive the truth value of any particular equation involving the sum of two numbers by using a shortcut for counting.

Without using a calculator, how do you know that 288 plus 8,724 equals 9,012? You would probably do something like the following, either on paper or in your head (if your mental math is better than mine):

![Long addition of 288 and 8724](../../assets/formal-systems/addition.png)

At this point, you feel very confident that 288+8,724=9,012 is a true statement. But how are you so sure? You didn’t imagine 288 cookies, then imagine 8,724 more, and then count how many cookies you had in all. You actually didn’t count anything at all. You used a **decision procedure** to determine whether that equation was true or not. In the context of formal systems, a decision procedure is a "test" that can determine whether a given string is a theorem of the system _in a finite amount of time_ (we’ll come back to this). If we wanted, we could write out the decision procedure for addition in excruciating detail; it doesn’t even need to rely on addition at all, since we can "hard-code" the sum of every single-digit addition, much in the same way we memorize them. Decision procedures are very powerful because, in a way, they show that we _deeply understand_ what’s going on in the formal system. Hofstadter has a great way of describing this:

> When you have a decision procedure, then you have a very concrete characterization of the nature of all theorems in the system. Offhand, it might seem that the rules and axioms of the formal system provide no less complete a characterization of the theorems of the system than a decision procedure would. The tricky word here is "characterization". Certainly the rules of inference and the axioms of the [formal system] do characterize, _implicitly_, those strings that are theorems. Even _more_ implicitly, they characterize those strings that are _not_ theorems. But implicit characterization is not enough, for many purposes. If someone claims to have a characterization of all theorems, but it takes him infinitely long to deduce that some particular string is not a theorem, you would probably tend to say that there is something lacking in that characterization– it is not quite concrete enough.

With that said, let’s cook up a decision procedure for the P-Q System. It might look a bit different than you expected, but perhaps more interesting.

> **Decision procedure for theoremhood in the P-Q System**
>
> Imagine we have a bucket. We’ll be putting in and taking out theorems from this bucket. We’ll start with only Axiom 1 in the bucket, and then repeat the following step: take all strings out of the bucket and apply all applicable rules of inference to each one to get new theorems. Then, put those _new_ theorems back into the bucket, discarding the old ones _and_ any new theorems that are identical to old ones.
>
> As we repeatedly apply this step, the theorems in the bucket will get longer and longer.[^6] More accurately, the length of the shortest theorem in the bucket is guaranteed to eventually increase after enough iterations. This is because neither rule takes a theorem and produces a shorter one. Granted, Rule 2 produces a new theorem of the same length as its predecessor, but our "only add it to the bucket if it hasn’t been seen before" rule guarantees that after Rule 2 has been applied once to a theorem, we won’t see the same theorem again.
>
> Say you want to test string _S_ for theoremhood. Take the length of _S_, call it _n_. As we keep this theorem generator going, eventually, after a _finite amount of time_, all of the theorems in our bucket will be longer than _n_ (as we explained above). At that point, we’ve seen _every_ theorem of length _n_. So either we've seen _S_ (it's a theorem), or we haven't, in which case it is not a theorem.

That explanation is a bit wordy, but it's very succinctly demonstrated by example. As instructed, we'll start out with just Axiom 1 in the bucket, and then start procedurally generating new theorems.

```
Bucket (iteration 0)
  * Axiom 1. -p-q--

New theorems:
  Theorem 1. --p-q--- (by Rule 1 on Axiom 1)
  Theorem 2. -p-q--   (by Rule 2 on Axiom 1); same as Axiom 1

Bucket (iteration 1)
  * Theorem 1: --p-q---

New theorems:
  Theorem 3. ---p-q---- (by Rule 1 on Theorem 1)
  Theorem 4. -p--q---   (by Rule 2 on Theorem 1)

Bucket (iteration 2)
  * Theorem 3. ---p-q----
  * Theorem 4. -p--q---

New theorems:
  Theorem 5. ----p-q----- (by Rule 1 on Theorem 3)
  Theorem 6. -p---q----   (by Rule 2 on Theorem 3)
  Theorem 7. --p--q----   (by Rule 1 on Theorem 4)
  Theorem 8. --p-q---     (by Rule 2 on Theorem 4); same as Theorem 1

Bucket (iteration 3):
  * Theorem 5: ----p-q-----
  * Theorem 6: -p---q----
  * Theorem 7: --p--q----
```

For example, if we wanted to know whether `---p-q---` (interpreted: 3+1=3) is a theorem, we know it’s not, because all the theorems in our bucket are at least 10 symbols long and we haven’t seen this one, which is 9 symbols long.

What’s interesting about this decision procedure is that it doesn’t rely on our intuition about addition at all. It _only_ requires that the rules of inference are either _all_ lengthening rules, or _all_ shortening rules, but not a mix of both.[^7]

At this point, we’ve covered all the important stuff. As a "fun" exercise to wrap up on, let’s take a look at a different formal system that I designed to represent the Collatz Conjecture.

## Enter the Collatz Conjecture

Honestly, if you’ve read this far, I kind of assume you already know what the Collatz Conjecture is. I imagine that the kind of person who reads this essay falls under the category of people who are aware of [PowerPoint’s Turing-Completeness](https://www.youtube.com/watch?v=uNjxe8ShM-8), the programming language [brainfuck](https://en.wikipedia.org/wiki/Brainfuck), the [Quake III fast inverse square root algorithm](https://en.wikipedia.org/wiki/Fast_inverse_square_root), and the Collatz Conjecture. But in case you’re the rare person who’s immediately interested in formal systems but hasn’t been introduced to this gem of mathematics, it would be an honor to be the first to show you.

The idea is to take any positive number, and then follow a very simple rule to get the next number:

> **Collatz Rule:** If your number is even, divide it by 2 to get the next number. If it is odd, multiply it by 3 and then add 1 to get the next number.

As an example, let’s take 3 as our first number.

```
1. 3  is odd,  so we get 3*3+1  = 10
2. 10 is even, so we get 10/2   = 5
3. 5  is odd,  so we get 5*3+1  = 16
4. 16 is even, so we get 16/2   = 8
5. 8  is even, so we get 8/2    = 4
6. 4  is even, so we get 4/2    = 2
7. 2  is even, so we get 2/2    = 1
8. 1  is odd,  so we get 1*3+1  = 4
```

We notice that 1 goes back to 4, which will cause an infinite loop of 4 → 2 → 1 → 4 → etc. What if we pick a different starting number, like 17?

```
1.  17 is odd,  so we get 17*3+1 = 52
2.  52 is even, so we get 52/2   = 26
3.  26 is even, so we get 26/2   = 13
4.  13 is odd,  so we get 13*3+1 = 40
5.  40 is even, so we get 40/2   = 20
6.  20 is even, so we get 20/2   = 10
7.  10 is even, so we get 10/2   = 5
8.  5  is odd,  so we get 5*3+1  = 16
9.  16 is even, so we get 16/2   = 8
10. 8  is even, so we get 8/2    = 4
11. 4  is even, so we get 4/2    = 2
12. 2  is even, so we get 2/2    = 1
```

The same thing happens, it just takes a little longer. We could have stopped as soon as we reached 10, since we already saw that 10 leads to 1. This leads to a very natural question:

> Does every positive integer eventually reach 1, after enough applications of the Collatz Rule?

And the answer is... we don’t know. A _lot_ has been said about the Collatz Conjecture, its apparent unprovability, and what that says about the state of mathematics, but that’s a bit out of scope here and you can find plenty of [cool articles](https://www.quantamagazine.org/why-mathematicians-still-cant-solve-the-collatz-conjecture-20200922/) about it elsewhere. I just thought it would be "fun" to craft a formal system that formulates the Collatz Conjecture in a slightly new way. Here it is:

> **The Collatz System**
>
> Allowed symbols: `-` (hyphen)
>
> _Axioms_
>
> - **Axiom 1**: `-`
>
> _Rules of inference_
>
> - **Rule 1**: If `{x}` is a theorem, where _x_ is a string of 1 or more hyphens, then `{x}{x}` is a theorem.
> - **Rule 2**: If `{x}{x}{x}{x}{x}{x}----` is a theorem, where _x_ is a string of 0 or more hyphens, then `{x}{x}-` is a theorem.

These might look a little different from the original formulation of the Collatz Conjecture because we’re working in _reverse_. Let’s try some examples, where it should become more apparent what’s going on. I’ll also introduce a shorthand where `-13-` means thirteen hyphens.

```
Axiom 1:   -
Theorem 1: --     (by rule 1 on axiom 1)
Theorem 2: ----   (by rule 1 on theorem 1)
Theorem 3: -8-    (by rule 1 on theorem 2)
Theorem 4: -16-   (by rule 1 on theorem 3)
Theorem 5: -5-    (by rule 2 on theorem 4)
Theorem 6: -10-   (by rule 1 on theorem 5)
Theorem 7: ---    (by rule 2 on theorem 6)
```

As you can see, theoremhood in the Collatz System corresponds to being a number that eventually reaches one via repeated application of the Collatz Rule. We’ll say a number is "Collatzy" if it has this property. From our current list of theorems, 1, 2, 3, 4, 5, 8, 10, and 16 are Collatzy. Are all natural numbers Collatzy? Are all strings in the Collatz system theorems? These are identical ways of posing the Collatz Conjecture.

One related question we might have about the Collatz Conjecture is whether there exists a decision procedure for theoremhood: some test that could, _in a finite amount of time_, determine whether a given string is a theorem of the Collatz system (and therefore represents a Collatzy number).

### A test for theoremhood?

But, we run into a snag. We can’t use the same method we used to generate a decision procedure for the P-Q System because this system has _both_ a lengthening and a shortening rule! This means that we can’t guarantee that all the theorems in our bucket will eventually all be longer than some given length, and even if we could, we couldn’t guarantee that a shorter theorem wouldn’t pop up later. So, this method is out of the question.

That said, we didn’t prove that there _is no_ decision procedure for Collatziness, but this certainly reduces our confidence. You might wonder, why can’t we just repeatedly use the Collatz rule and call that a decision procedure? The catch is that it’s not guaranteed to finish in a finite amount of time. What if the numbers in the sequence just keep getting bigger and bigger? How do you know for sure it will eventually come back down? The answer is, in general, you don’t.

Now, there are other ways of coming up with a decision procedure. For example, for the P-Q System, we could have just said:

> **Decision procedure for theoremhood in the P-Q System (Version 2)**
>
> If _S_ is a well-formed string of the P-Q system of the form `{x}p{y}q{z}`, it is a theorem if and only if _length_(_x_) + _length_(_y_) = _length_(_z_).

But this decision procedure relies on the fact that we already proved the P-Q System to be isomorphic to addition. In other words, it was easy because the P-Q system represents such a simple concept that we could appeal to our higher insights about math in order to describe theoremhood in the P-Q System.

But in the Collatz System, so far, mathematicians haven’t found an analogous "higher insight" that would allow us to look at a string of hyphens and deterministically decide whether it is a theorem or not. In other words, we understand addition extremely well, and we understand multiplication extremely well, but put the two together and you’ve already exceeded our current understanding of how numbers work.[^8] It’s fascinating to wonder whether some hypothetical being with a completely alien brain could look at a number and immediately glean whether it is Collatzy in the same way that we can easily verify that 288+8,724=9,012.[^9] Is such a thing possible?

The Collatz System also illustrates an interesting fact about formal systems, which is that knowing how to generate theorems is _not_ necessarily the same as knowing how to generate nontheorems. For that matter, if we knew how to generate a _single_ nontheorem of the Collatz System, we would have disproved the Conjecture (and ruined many mathematicians’ life research).

## Conclusion

At this point, you may be wondering what you’re supposed to take away from all of this. This is a fair question; I wonder the same thing too. In all seriousness, my main goal was to bring the following to your attention:

- **Symbol-pushing**: Formal systems describe typographic rules for manipulating meaningless symbols.
- **Isomorphism**: Despite having no inherent meaning, formal systems, through their form alone, can have such a strong isomorphism to things in the "real world" (e.g. addition, logic, geometry) that we treat them as equivalent, like treating long addition as a valid way to count things.
- **Understanding**: Using symbols to model the world has allowed us to understand our universe in a much deeper way than our ancestors.
- **Soungness & completeness**: When a formal system attempts to represent truth somehow, we are often interested in soundness and completeness. A system is sound if all of its theorems, when interpreted, are true. A system is complete if all true statements expressible in the system are theorems. Ideally, formal systems that represent truth would be both sound and complete.
- **Formal systems are incomplete**: We might want to know whether some given string is a theorem or not, in a finite amount of time. A procedure for this exists for some formal systems, but not all. This suggests that, for all the simplicity of formal systems, we cannot always fully characterize their behavior. This fact lies at the root of essentially all mathematical mysteries.

That’s about it. I intentionally didn’t touch some of the juiciest content which comes up when we connect number theory to formal systems. That’s because I wanted this article to be purely exploratory; something I can point folks to as background for more niche topics.

But really, more so than any of those takeaways I proposed, I wanted to capture the feeling of looking at something as simple as 1+1=2 and questioning to what extent it represents the real world. The fact that physics works at all would suggest that the universe really is pretty isomorphic to symbols on a page. And I hope you find this as awesome and unsettling as I do. ■

[^1]: Well, maybe you weren't going to ask yourself that, but I was.
[^2]: Another way of putting this is that Rule 2 expresses the commutative property of addition.
[^3]: Well, we wouldn’t want it to be any other way when we’re talking about counting everyday things, like cookies or people. But depending on the context, addition might not be commutative, like [ordinal arithmetic](https://en.wikipedia.org/wiki/Ordinal_arithmetic).
[^4]: There’s a nuance here that I want to write about separately, but I’ll just hint at it here. The extent to which addition actually exists "in the real world" is much more debatable than say, electricity. When we point to examples of real-world addition, we pick examples that fit nicely with our abstract idealization of numbers, like cookies. If addition truly represented "putting things together" in the physical world, then 1 plus 1 might equal 1, such as in the case of two water droplets merging. Obviously, you would say that the _number_ of droplets didn't sum, but the _volume_ did. And while that's true, hopefully that thought experiment makes you aware that your definition of addition is entirely shaped by your abstract, mathematical idealization of it, and you find examples of addition in the real world _through_ that lens, not the other way around.
[^5]: If you're just looking for some intuition on this, consider the rules of algebra: They describe specific operations you're allowed to perform on an equation in order to generate a new, equally true equation. For example, you're allowed to add the same number to both sides of the equal sign. Although we often take creative liberty in choosing _which_ rules to apply, the process of applying the rules itself is purely mechanical.
[^6]: Note that I don’t mean the _number_ of theorems in the bucket, I mean the _length of each theorem_ in symbols.
[^7]: As we saw, rules that produce theorems of equal length cause a slight headache with this method. But, since there is only a finite number of allowed symbols in a formal system, then we’re still guaranteed that, at the very worst, eventually we’ll have seen every theorem of that length, and we can use the "only add new theorems to the bucket" rule to ensure that the shortest theorem in the bucket eventually has to give way to a longer one.
[^8]: This might sound like a joke, but it's not really. See: the Goldbach Conjecture, the Twin Primes Conjecture, and odd perfect numbers.
[^9]: This line of thought is closely related to the P=NP problem. If you haven't heard of it, and you're reached this footnote, you should [check it out](https://en.wikipedia.org/wiki/P_versus_NP_problem)!
