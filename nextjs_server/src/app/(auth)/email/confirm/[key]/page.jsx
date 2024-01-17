
export default function ConfirmEmail({ params }) {


  return (
    <div>
      <h1>Email Confirmation</h1>
      <p>Your confirmation key is: {params.key}</p>
    </div>
  )
}
