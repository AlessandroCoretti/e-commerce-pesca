import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="newsletter">
      <div className="container">
        {submitted ? (
          <>
            <h2>Thanks for Signing Up!</h2>
            <p>Check your inbox for exclusive deals and outdoor tips.</p>
          </>
        ) : (
          <>
            <h2>Get Exclusive Deals &amp; Outdoor Tips</h2>
            <p>
              Sign up for the Bass Pro Shops email newsletter and be the first to know about
              sales, new products, and expert outdoor advice.
            </p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
              />
              <button type="submit">Sign Up</button>
            </form>
            <p className="newsletter-disc">
              By subscribing you agree to our Privacy Policy. You may unsubscribe at any time.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
