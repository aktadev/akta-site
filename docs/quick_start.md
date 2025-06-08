# Akta Quick Start Guide

Welcome to Akta, a secure trust framework for AI agents. This guide will help you get started with using Akta in your projects.

## Installation

```bash
pip install akta
```

## Basic Usage

Here's a simple example of how to use Akta to create and verify an agent identity:

```python
from akta import Agent, Credential

# Create a new agent with a DID
agent = Agent.create("agent-1")
print(f"Agent DID: {agent.did}")

# Issue a capability credential to the agent
credential = Credential.create(
    issuer=agent.did,
    subject=agent.did,
    capabilities=["read:documents", "write:documents"],
    expiration=3600  # Expires in 1 hour
)

# Sign and store the credential
signed_credential = agent.sign_credential(credential)
agent.store_credential(signed_credential)

# Verify the credential
is_valid = agent.verify_credential(signed_credential)
print(f"Credential is valid: {is_valid}")

# Delegate a subset of capabilities to another agent
agent2 = Agent.create("agent-2")
delegated_credential = agent.delegate_credential(
    signed_credential,
    subject=agent2.did,
    capabilities=["read:documents"],
    expiration=1800  # Expires in 30 minutes
)

# Agent 2 can verify the delegation chain
is_valid = agent2.verify_credential(delegated_credential)
print(f"Delegated credential is valid: {is_valid}")
```

## Core Concepts

### Decentralized Identifiers (DIDs)

Akta uses DIDs to provide cryptographically verifiable identities for agents. Each agent has a unique DID that can be used to verify the authenticity of credentials.

### Verifiable Credentials

Credentials in Akta represent capabilities that an agent has been granted. They contain:

- **Issuer**: The DID of the entity issuing the credential
- **Subject**: The DID of the entity receiving the credential
- **Capabilities**: A list of capabilities granted
- **Conditions**: Optional constraints on when and how the capabilities can be used
- **Expiration**: When the credential expires

### Credential Store

The credential store is a secure repository for storing and retrieving credentials. It provides:

- Secure storage of credentials
- Fast retrieval by subject, issuer, or capability
- Revocation checking

### Delegation

Agents can delegate a subset of their capabilities to other agents. The delegation chain is cryptographically verifiable, ensuring that:

1. The original credential is valid
2. The delegator had the right to delegate
3. The delegation hasn't expired
4. The delegation hasn't been revoked

## Advanced Features

### Capability-based Security

Akta uses capability-based security principles, where:

- Capabilities are unforgeable tokens of authority
- Possession of a capability is necessary and sufficient for access
- Delegation follows the "principle of attenuation" - delegates can't gain more power than delegators

### Revocation

Credentials can be revoked using several mechanisms:

- Direct revocation by the issuer
- Time-based expiration
- Condition-based revocation (e.g., after a certain number of uses)

## Next Steps

- Check out the [full documentation](https://github.com/your-github/akta/docs)
- Explore the [examples directory](https://github.com/your-github/akta/examples)
- Join the [community discussions](https://github.com/your-github/akta/discussions)

## Need Help?

If you run into any issues or have questions, please:

- Check the [FAQ](https://github.com/your-github/akta/docs/faq.md)
- Open an [issue](https://github.com/your-github/akta/issues)
- Reach out via [discussions](https://github.com/your-github/akta/discussions) 