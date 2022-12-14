import * as anchor from '@project-serum/anchor'
import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { STABLE_POOL_IDL , STABLE_POOL_PROGRAM_ID } from './const'

export function getProgramInstance(connection, wallet) {
    if (!wallet.publicKey) throw new WalletNotConnectedError()
  
    const provider = new anchor.Provider(
      connection,
      wallet,
      anchor.Provider.defaultOptions(),
    )
     // Read the generated IDL.
  const idl = STABLE_POOL_IDL

  // Address of the deployed program.
  const programId = STABLE_POOL_PROGRAM_ID

  // Generate the program client from IDL.
  const program = new anchor.Program(idl, programId, provider)

  return program
}