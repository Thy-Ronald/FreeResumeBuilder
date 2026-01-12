import './StepNavigation.css'
import Icon from './Icon'

const steps = [
  { id: 'personal', label: 'Personal Info', icon: 'user' },
  { id: 'education', label: 'Education', icon: 'education' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'skills', label: 'Skills', icon: 'skills' },
  { id: 'projects', label: 'Projects', icon: 'project' },
  { id: 'preview', label: 'Preview / Export', icon: 'preview' },
]

function StepNavigation({ activeStep, onStepChange }) {
  return (
    <nav className="step-navigation">
      <div className="nav-header">
        <h1>Resume Builder</h1>
      </div>
      <ul className="step-list">
        {steps.map((step) => (
          <li key={step.id}>
            <button
              className={`step-item ${activeStep === step.id ? 'active' : ''}`}
              onClick={() => onStepChange(step.id)}
            >
              <Icon name={step.icon} className="step-icon" />
              <span className="step-label">{step.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default StepNavigation
