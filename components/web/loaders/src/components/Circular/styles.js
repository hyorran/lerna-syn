export default () => ({
  overlay: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    background: 'rgba(255,255,255,0.45)',
    zIndex: '9999',
    transition: '500ms all',
    opacity: '0',
    height: '0',
    '&.visible': {
      opacity: '1',
      height: '100%',
    },
    '&.invisible': {
      opacity: '0',
      height: '0',
    }
  },
  loader: {
    display: 'inline-block',
    transformOrigin: 'center',
    animation: 'loading 2s linear infinite'
  },
  '@keyframes loading': {
    to: { transform: 'rotate(360deg)' },
  }
})
