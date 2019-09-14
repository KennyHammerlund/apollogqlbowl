# APOLLO GQL BOWL

Kenny Hammerlund
Stargazer Web Design and Marketing
http://web.stargazerllc.com

https://www.apollographql.com/docs/react/features/optimistic-ui/

# Optimistic UI: Predicting the future

The purpuse of this project is to demonstrate how optimistic UI works. To get started set your name and delay in the drawer. The delay is the server delay given to the score button mutations. Use the delay to do different things with the UI and Apollo Cache.

## Reset Query

* `src/drawer/resetButton.js` - explains the basics of optimistic flow. @apollo/react-hooks
* `src/homeScreen/User/AddFieldGoal` - mutation that adds a score. @apollo/react-hooks
* `src/homeScreen/User/AddTouchdown` - mutation that adds a score. @apollo/react-hooks


## Challenges to overcome
* figure out if there is a way to run multiple optimistic mutations. Currently there one overwrites the other. 
  * Might solve the problem - https://github.com/helfer/apollo-link-serialize
* look at offline solutions and how they can implement with optimistic queries. 
  * https://www.npmjs.com/package/apollo-link-offline
  * https://github.com/helfer/apollo-link-queue
  