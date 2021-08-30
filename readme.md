const projectGroup = {
  memberOne: 'Peter',
  memberTwo: 'Derek',
  MemberThree: 'Kyle',
  MemberFour: 'Chen',
};


# Summary
This is an Coffee drink API that allows users to see all data, specific data filter by id or brew methods.
Additionally, since it allows users to create their own accounts, logged in users can add their favorite drinks to this API, as well as updating and deleting. 

## Deployed URL
https://warm-gorge-13979.herokuapp.com

## Endpoints
1. Authentication (User Signup) --- https://warm-gorge-13979.herokuapp.com/api/v1/auth/signup
2. Authentication (User Login) --- https://warm-gorge-13979.herokuapp.com/api/v1/auth/login
3. Get All Drinks --- https://warm-gorge-13979.herokuapp.com/api/v1/drinks
4. Get a drink by id --- https://warm-gorge-13979.herokuapp.com/api/v1/drinks/1
5. Get a type of drinks by brew method --- https://warm-gorge-13979.herokuapp.com/api/v1/drinks?type=drip
6. Add a favorite drink --- https://warm-gorge-13979.herokuapp.com/api/v1/drinks
7. Logged user get their favorite drinks --- https://warm-gorge-13979.herokuapp.com/api/v1/auth/favorites
8. Logged user add their favorite drink --- https://warm-gorge-13979.herokuapp.com/api/v1/auth/favorites 
9. Logged user update their favorite drink --- https://warm-gorge-13979.herokuapp.com/api/v1/auth/drinks/41
10. Logged user delete their favorite drink --- https://warm-gorge-13979.herokuapp.com/api/v1/auth/drinks/41 