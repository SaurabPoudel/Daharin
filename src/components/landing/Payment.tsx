import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export const Pricing = () => (
  <section id="pricing" className="py-20 ">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold  mb-6">Pricing Plans</h2>
      <p className="text-gray-700 mb-12">
        Choose the plan that fits your needs. Use WhatsApp to complete the payment and verification process.
      </p>
      <div className="flex items-center justify-between flex-col md:flex-row">
        <div className="gap-y-4 flex flex-col"> 
        
        {/* Free Plan */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-emerald-600 text-2xl">Free Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Track up to 2 meals per day at no cost.</p>
          </CardContent>
        </Card>

        {/* Premium Plan */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-emerald-600 text-2xl">Premium Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Unlimited meal tracking for just $30 per year. To activate, send "pay" on WhatsApp and share proof of payment.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Instructions:</strong> Open WhatsApp, type <code>pay</code>, complete payment, then send a screenshot for verification.
            </p>
          </CardContent>
        </Card>
        </div>
        <img src="4.png" className="max-h-96 object-contain scale-110">
        </img>
      </div>
    </div>
  </section>
);