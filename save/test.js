x = rnorm(1000, 5, 2);
str(x);
hist(x, "x", "normalized");
curve("dnorm(x, 5,2)", "N(5,2)", 0.2);
