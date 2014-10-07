Ax = R.rnorm(100, 10, 1);
Ay = R.rnorm(100, 0, 0.5);
Bx = R.rnorm(100, 0, 1);
By = R.rnorm(100, 0, 0.5);
G.plot(Ax, Ay, {name:"A"});
G.plot(Bx, By, {name:"B"});
