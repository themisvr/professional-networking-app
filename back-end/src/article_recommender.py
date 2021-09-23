import numpy as np


class MatrixFactorization():

    def __init__(self, X, K, h):
        self.X = X
        self.K = K
        self.h = h
        self.n_users, self.n_posts = X.shape

    def train_model(self):
        self.V = np.random.uniform(size=(self.n_users, self.K))
        self.F = np.random.uniform(size=(self.K, self.n_posts))
        known_values = np.count_nonzero(self.X)
        rmse_prev = -2
        rmse = -1
        # Terminate the loop when the RMSE does not decrease during two iterations
        while (rmse != rmse_prev):
            xs, ys = self.X.nonzero()
            total_square_error = 0
            # Iterate over each known element of X xij
            for i, j in zip(xs, ys):
                # Compute e_ij
                error_ij = self.X[i,j] - self.V[i,:].dot(self.F[:,j])
                # Compute the gradient of (e_ij)^2
                total_square_error += pow(error_ij, 2)
                # Update the ith row of V and the jth column of F according to the below equations
                # (1) V'ik = Vik + h * 2 * eij * Fkj
                # (2) F'kj = Fkj + h * 2 * eij * Vik
                self.V[i,:] += self.h * 2 * error_ij * self.F[:,j]
                self.F[:,j] += self.h * 2 * error_ij * self.V[i,:]
            # Calculate the RMSE
            rmse_prev = rmse
            rmse = np.sqrt(total_square_error / known_values)

    def X_predicted(self):
        return self.V.dot(self.F)

