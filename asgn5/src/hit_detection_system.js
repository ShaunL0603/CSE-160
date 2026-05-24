import * as THREE from 'three';

export class HitDetectionSystem {
    constructor() {
        // Pre-allocated properties
        this._ray = new THREE.Ray();
        this._sphere = new THREE.Sphere();
        this._intersectionPoint = new THREE.Vector3();
    }

    evaluateShot(origin, direction, targets) {
        this._ray.set(origin, direction);
        
        let closestTargetId = null;
        let closestDistance = Infinity;

        for (let i = 0; i < targets.length; i++) {
            const target = targets[i];
            if (!target.active) continue;

            // Align preallocated sphere to target properties
            this._sphere.center.copy(target.position);
            this._sphere.radius = target.boundingRadius * target.scale;

            // Fast ray-sphere intersection check
            const hitPoint = this._ray.intersectSphere(this._sphere, this._intersectionPoint);

            if (hitPoint !== null) {
                const distance = origin.distanceTo(hitPoint);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestTargetId = target.id;
                }
            }
        }

        return closestTargetId;
    }
}