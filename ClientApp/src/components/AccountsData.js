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
          <button type="button" class="btn btn-primary" onClick={async ()=>{
            await fetch(`api/${account.AccountNumber}/enroll`).then(response => {
              if(response){
                window.location.reload(false)
              }
            })
          }}>Enroll Now!</button>
        )
      }
      else {
        if (account.RewardsPoints>=50) {
          return <button type="button" class="btn btn-success" onClick={async () => {
            await fetch(`api/${account.AccountNumber}/redeem`).then(response => {
              if(response){
                window.location.reload(false)
              }
            }
            )
          }}>Redeem Reward</button>
        } else { return <span class="text-info">Not Enough Points</span>}
      }
    }


    return(
      <div>
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
        <button onClick={async () => {
          await fetch('api/create').then(window.location.reload(false))
        }}>Create New Account</button>
      </div>
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