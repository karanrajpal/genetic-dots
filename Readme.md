# Genetic Dots
Project to demonstrate Genetic Algorithms.

## Genetic algorithms
Replicate the principles of Natural Selection and Survival of the fittest to generate solutions to problems.
These algorithms are useful when there are many possible ways to achieve a solution, so the algorithm tries a bunch of random ways to get to the solution, and across many generations comes closer to a better solution.

### Principles of Genetic Algorithms
1. Heredity
2. Variance
3. Survival of the Fittest

If you want to learn more about Genetic Algorithms, I recommend [youtube.com]

## Data Structures
### Dot
An individual unit of the population, akin to a single animal of a species.
It is in charge of experimenting and moving around randomly using it's Genetic composition.

### Genes
A Dot has Genes. Genes are responsible for defining the unique characteristics of the dot, which in this case are a sequence of steps that the Dot will try during it's lifetime.

### Population
Stores a collection of Dots and ties each collection to a numbered generation. It is in charge of tracking meta information about the different Dots performance and advancing generations by spawning a new generation of Dots. It chooses the next generation by applying the **Survival of the Fittest** principal.

## Algorithm
