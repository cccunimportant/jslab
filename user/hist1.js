x = rnorm(1000, 5, 2);
hist(x, {name:"x", mode:"normalized"});
curve("dnorm(x, 5,2)", {name:"N(5,2)", step:0.2});
