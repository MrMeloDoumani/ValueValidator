import { Shield, TrendingUp, Zap } from 'lucide-react'
import ValidatorForm from '@/components/ValidatorForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              Value Validator
            </h1>
            <p className="text-xl md:text-2xl text-navy-300">
              The Automated Strategy Consultant
            </p>
            <p className="text-lg text-navy-400 max-w-2xl mx-auto">
              Porter. Buffett. Collins. In one tool.
            </p>
          </div>

          <div className="bg-navy-800/30 border border-navy-700 rounded-2xl p-8 md:p-12">
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Stop Pitching Weak Ideas. Start Validating Value.
              </h2>
              <p className="text-navy-300">
                Most founders and investors fly blind. They have passion but lack Strategy.
                Hiring a strategy consultant costs $10,000+. The Value Validator does it in 30 seconds.
              </p>
            </div>

            <ValidatorForm />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-navy-800/30 border border-navy-700 rounded-xl p-6 text-center">
              <Shield className="w-12 h-12 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">The Defense</h3>
              <p className="text-navy-300 text-sm">
                Michael Porter stress-tests your Barriers to Entry
              </p>
            </div>
            <div className="bg-navy-800/30 border border-navy-700 rounded-xl p-6 text-center">
              <TrendingUp className="w-12 h-12 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">The Moat</h3>
              <p className="text-navy-300 text-sm">
                Warren Buffett evaluates your Economic Moat
              </p>
            </div>
            <div className="bg-navy-800/30 border border-navy-700 rounded-xl p-6 text-center">
              <Zap className="w-12 h-12 text-gold-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">The Engine</h3>
              <p className="text-navy-300 text-sm">
                Jim Collins analyzes your Flywheel Effect
              </p>
            </div>
          </div>

          <div className="text-center space-y-4 pt-8 border-t border-navy-700">
            <p className="text-navy-400 text-sm">
              Know if your idea is a fortress or a house of cards before you pitch.
            </p>
            <p className="text-gold-400 font-semibold">
              $499 Consultant License | Launch Price: Pay What You Want (Min $49)
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

