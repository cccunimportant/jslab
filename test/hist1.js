x = rnorm(1000, 5, 2);
hist(x, "normalized", "x");
curve("dnorm(x, 5,2)", "N(5,2)", 0.2);
