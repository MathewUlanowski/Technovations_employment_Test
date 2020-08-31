import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Redirect, Route } from 'react-router-dom';
import { axios } from 'axios';

export class AccountsData extends Component {
  static displayName = AccountsData.name;

  constructor(props) {
    super(props);
    this.state = { accounts: [], loading:true }
  }

  componentDidMount() {
    this.populateAccounts();
  }

  static renderAccountsTable(accounts) {
    function IsEnrolled(account){
      if (!account.IsEnrolled) {
        return (
          <form method="post" action>
            <button type="button" class="btn btn-primary">Enroll Now!</button>
          </form>
        )
      }
      else {
        if (account.RewardsPoints>50) {
          return <button type="button" class="btn btn-success">Redeem Reward</button>
        } else { return <span class="text-info">Not Enough Points</span>}
      }
    }


    return(
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <th>Account Name</th>
          <th>Balance</th>
          <th>Account Name</th>
          <th>Rewards Points</th>
          <th>Rewards Program</th>
        </thead>
        <tbody>
          {
            accounts.map(accounts => {
              return (
                <tr key={accounts.AccountNumber}>
                  <td>{accounts.AccountNumber}</td>
                  <td>{accounts.FormattedBalance}</td>
                  <td>{accounts.NickName}</td>
                  <td>{accounts.RewardsPoints}</td>
              <td>{IsEnrolled(accounts)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  };

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : AccountsData.renderAccountsTable(this.state.accounts);

    return (
      <div>
        <h1 id="tabelLabel">Your Accounts</h1>
        {contents}
      </div>
    )
  }
  async populateAccounts() {
    const response = await fetch('api/accounts');
    const data = await response.json();
    this.setState({ accounts: data, loading: false });
  }
}