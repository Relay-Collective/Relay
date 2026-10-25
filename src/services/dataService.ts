import type { DriverEtaHint } from '../logic/driverEta'
import type {
  Destination,
  Driver,
  FeedbackRating,
  House,
  Identity,
  Impact,
  Invitation,
  InvitationPreview,
  Organization,
  OrganizationApplication,
  Ride,
  RideEvent,
  RideFeedback,
  RideOffer,
  User,
  VerificationStatus,
} from '../types'

export type NewOrganization = Omit<Organization, 'id' | 'status'>
export interface NewAccount {
  name: string
  email: string
  password: string
  next?: string // where the confirmation link continues to, e.g. an invitation; a path on this site
}
// Outcome of self sign-up. With email confirmation on, the account exists but nobody is signed in yet.
export type Registration = { status: 'SIGNED_IN'; user: User } | { status: 'CONFIRM_EMAIL'; email: string }
// Outcome of creating an identity (sign-up without a role). Onboarding gives it a role afterwards.
export type SignUpResult = { status: 'SIGNED_IN'; identity: Identity } | { status: 'CONFIRM_EMAIL'; email: string }
// Who is signed in. user is the Relay Collective profile, read from the backend; it's missing until onboarding finishes.
export interface Session {
  identity: Identity
  user?: User
}
// What a partner organization sends when it applies. The backend creates the org, its location, and the applicant's profile.
export interface NewOrganizationApplication
  extends Pick<OrganizationApplication, 'kind' | 'website' | 'description' | 'contactEmail' | 'contactRole' | 'serviceCategories' | 'platformInterests'> {
  orgName: string
  contactName: string
  contactPhone: string
  address: string
  city: string
}
// A new invitation. The token is shown once, to build the link; the backend keeps only its hash.
export interface CreatedInvitation {
  invitation: Invitation
  token: string
}
// What an admin's password reset produced. The demo sets a password to share; the real backend emails a reset link.
export type PasswordReset = { kind: 'NEW_PASSWORD'; email: string; password: string } | { kind: 'EMAIL_SENT'; email: string }
export type NewDriverUser = Pick<User, 'name' | 'phone'>
export type NewDriver = Omit<Driver, 'id' | 'userId' | 'status'>
// A partner organization's one location: where its rides start
export type NewLocation = Pick<House, 'address' | 'city' | 'phone'>
// What drivers can change themselves from their settings page
export type DriverSettings = Pick<
  Driver,
  'requestHours' | 'vehicle' | 'seats' | 'wheelchairAccessible' | 'serviceCities'
>
export type NewRide = Omit<
  Ride,
  | 'id'
  | 'status'
  | 'createdAt'
  | 'driverOnTheWayAt'
  | 'driverEta'
  | 'driverArrivedAt'
  | 'pickedUpAt'
  | 'completedAt'
  | 'droppedBy'
  | 'cancelledAt'
  | 'expired'
  | 'changedAt'
  | 'reconfirmDriverId'
>
// What the partner can change after booking. Changing when, where, or who sends the ride out to drivers again.
export type RideChanges = Pick<
  Ride,
  | 'type'
  | 'pickupTime'
  | 'passengers'
  | 'riderNames'
  | 'needsWheelchair'
  | 'needsAssistance'
  | 'pickupInstructions'
  | 'notes'
  | 'destinationId'
  | 'destinationName'
  | 'destinationAddress'
>
// Staff send a rating (and an optional note). Drivers send only a note: the issue they're flagging.
export interface FeedbackInput {
  rating?: FeedbackRating
  note?: string
}

// Sign-in refused because the email hasn't been confirmed yet. The sign-in page offers a new link.
export class UnconfirmedEmailError extends Error {}

// The most rides the platform admin's oversight list loads at once
export const ALL_RIDES_LIMIT = 1000

// The contract every backend must follow (mock now, real backend later).
// Screens only talk to this interface, never to storage directly.
export interface DataService {
  // Session. The backend decides who is signed in; screens never set it directly.
  // The signed-in identity and its profile, if any; throws if it can't be checked (or the account was closed)
  restoreSession(): Promise<Session | undefined>
  signIn(email: string, password: string): Promise<Session> // starts a session; throws if they don't match
  signOut(): Promise<void>
  // Calls back when the session changes outside this screen (another tab, expiry, demo reset). Returns unsubscribe.
  onSessionChange(listener: () => void): () => void
  // Calls back when shared data this person can see changes elsewhere (live updates). Returns unsubscribe.
  onDataChange(listener: () => void): () => void
  // "Forgot password": emails a reset link if an account exists, without saying whether one does
  requestPasswordReset(email: string): Promise<void>
  // Sets a new password for the signed-in person, e.g. after opening a reset link
  updatePassword(newPassword: string): Promise<void>
  // Creates an identity only (no role). Says nothing about whether the email was already registered
  // when email confirmation is on, so sign-up can't be used to probe who has an account.
  signUp(account: NewAccount): Promise<SignUpResult>
  // Sends the confirmation email again. Same answer whether or not the email has an account.
  resendVerification(email: string): Promise<void>

  // Onboarding, for a signed-in identity without a role. Each returns the new profile.
  // Safe to repeat: a retry returns the profile the first call made instead of creating another.
  submitOrganizationApplication(application: NewOrganizationApplication): Promise<User>
  registerDriverProfile(user: NewDriverUser, driver: NewDriver): Promise<User>
  // The application behind an organization: its members and platform admins only
  getOrganizationApplication(orgId: string): Promise<OrganizationApplication | undefined>

  // Invitations. Staff of an approved partner organization invite colleagues by email; the backend
  // picks the organization and role, checks every rule again on acceptance, and allows one use.
  createInvitation(email: string): Promise<CreatedInvitation>
  listInvitations(): Promise<Invitation[]> // the signed-in member's organization's
  revokeInvitation(invitationId: string): Promise<void>
  previewInvitation(token: string): Promise<InvitationPreview> // signed-in only
  acceptInvitation(token: string): Promise<User>

  // Accounts
  listUsers(): Promise<User[]>
  isEmailAvailable(email: string): Promise<boolean>

  // Organizations. Registering also creates the sign-in account; everything starts PENDING.
  // A partner organization gives its location (and any first destinations) too: it gets one shared account that books from there.
  registerOrganization(
    org: NewOrganization,
    account: NewAccount,
    location?: NewLocation,
    destinations?: Pick<Destination, 'name' | 'address' | 'city'>[],
  ): Promise<Registration>
  listOrganizations(): Promise<Organization[]>

  // Locations (point A): one per partner organization
  listHouses(orgId?: string): Promise<House[]>

  // Drivers: self sign-up with a login, or added by a transport provider without one
  registerDriver(user: NewDriverUser, driver: NewDriver, login: Pick<NewAccount, 'email' | 'password'>): Promise<Registration>
  addOrgDriver(user: NewDriverUser, driver: NewDriver): Promise<Driver> // transport providers only; the backend uses the signed-in org
  listDrivers(orgId?: string): Promise<Driver[]>
  // Approved drivers' eligibility (seats, cities, hours) for booking previews, without saying who they are
  listDriverPool(): Promise<Driver[]>
  updateDriver(driverId: string, changes: Partial<DriverSettings>): Promise<Driver>

  // Platform admin
  listPending(): Promise<{ orgs: Organization[]; drivers: Driver[] }>
  setOrgStatus(orgId: string, status: VerificationStatus): Promise<Organization>
  setDriverStatus(driverId: string, status: VerificationStatus): Promise<Driver>
  listAccounts(): Promise<User[]> // users who can sign in
  // Helps someone who is locked out. Platform admins only.
  resetPassword(userId: string, newPassword?: string): Promise<PasswordReset>
  // Removes the account and its sign-in. A driver stops getting requests, and their upcoming rides
  // go back out to other drivers. Houses, organizations, and past rides stay.
  deleteAccount(userId: string): Promise<void>
  // The signed-in driver or partner organization closes their own sign-in. Ride history stays.
  // A driver with a client in the car has to finish that ride first.
  deleteMyAccount(): Promise<void>

  // Destinations (point B). Past rides keep the address they were booked with.
  listDestinations(orgId?: string): Promise<Destination[]>
  saveDestination(dest: Omit<Destination, 'id'>): Promise<Destination>
  updateDestination(id: string, changes: Pick<Destination, 'name' | 'address' | 'city' | 'notes'>): Promise<Destination>
  deleteDestination(id: string): Promise<void>

  // Rides: partner organization
  // Throws if a scheduled pickup time is in the past or the ride is too big. Send the same clientRequestId
  // when retrying one submission, so an answer lost on the network can't create a second booking.
  requestRide(ride: NewRide, clientRequestId?: string): Promise<Ride>
  updateRide(rideId: string, changes: RideChanges): Promise<Ride> // only before pickup
  getRide(rideId: string): Promise<Ride | undefined>
  listRidesForHouse(houseId: string): Promise<Ride[]>
  listOffersForRide(rideId: string): Promise<RideOffer[]>
  retryRide(rideId: string): Promise<Ride>
  cancelRide(rideId: string, reason: string): Promise<Ride>

  // Rides: drivers, and transport providers acting for their drivers
  listMyOffers(driverId: string): Promise<RideOffer[]>
  listOffersForOrg(orgId: string): Promise<RideOffer[]>
  listMyRides(driverId: string): Promise<Ride[]>
  listRidesForOrg(orgId: string): Promise<Ride[]> // rides taken by the org's drivers
  // Platform admin only (checked by the backend): every ride, newest pickup first, for oversight
  listAllRides(): Promise<Ride[]>
  respondToOffer(offerId: string, accept: boolean): Promise<Ride>
  dropRide(rideId: string, driverId: string): Promise<Ride>
  markOnTheWay(rideId: string, eta?: DriverEtaHint): Promise<Ride> // driver set off; ETA is from now, or offset from pickup
  markDriverArrived(rideId: string): Promise<Ride> // driver is at the pickup ("I'm here")
  markPickedUp(rideId: string): Promise<Ride>
  markCompleted(rideId: string): Promise<Ride>
  markNoShow(rideId: string): Promise<Ride> // client passed up the ride and loses it
  undoDriverStep(rideId: string, driverId: string): Promise<Ride> // takes back the driver's last step

  // Change history, oldest first. Staff see their own rides'; the platform admin sees every ride's.
  listRideEvents(rideId: string): Promise<RideEvent[]>

  // Feedback on a finished ride. Giving it again replaces the earlier one.
  // Throws if the ride isn't over, or isn't this partner's or driver's ride.
  giveFeedback(rideId: string, feedback: FeedbackInput): Promise<RideFeedback>
  listMyFeedback(): Promise<RideFeedback[]> // what the signed-in person gave
  listFeedback(filter: { driverId?: string; orgId?: string }): Promise<RideFeedback[]> // platform admin only

  // Impact
  getImpact(): Promise<Impact>
}
